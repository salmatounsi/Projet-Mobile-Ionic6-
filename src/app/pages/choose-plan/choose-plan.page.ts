import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionApiService } from '../../services/subscription-api.service';

type PlanType = 'basic' | 'standard' | 'premium';
type UserRole = 'client' | 'freelancer';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
  standalone: false,
})
export class ChoosePlanPage implements OnInit {
  autoRenew = true;
  agreed = false;
  loading = false;

  role: UserRole = 'freelancer';
  selectedPlan: PlanType = 'standard';

  plans = [
    {
      id: 'basic' as PlanType,
      name: 'Basic',
      price: 9.99,
      subtitle: 'Pour commencer simplement',
      badge: '',
      featuresClient: [
        'Publier des offres limitées',
        'Consulter les services disponibles',
        'Acheter des produits numériques',
        'Support standard'
      ],
      featuresFreelancer: [
        'Profil freelancer visible',
        'Accès aux offres publiques',
        'Publication de services limitée',
        'Support standard'
      ]
    },
    {
      id: 'standard' as PlanType,
      name: 'Standard',
      price: 19.99,
      subtitle: 'Le meilleur choix pour évoluer',
      badge: 'Recommandé',
      featuresClient: [
        'Publication d’offres illimitée',
        'Accès aux freelancers vérifiés',
        'Meilleure visibilité des offres',
        'Support prioritaire'
      ],
      featuresFreelancer: [
        'Propositions illimitées',
        'Services mieux mis en avant',
        'Accès aux offres premium',
        'Support prioritaire'
      ]
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium',
      price: 39.99,
      subtitle: 'Pour maximiser vos résultats',
      badge: 'Pro',
      featuresClient: [
        'Offres mises en avant',
        'Accès prioritaire aux meilleurs profils',
        'Suivi avancé des candidatures',
        'Support premium'
      ],
      featuresFreelancer: [
        'Visibilité maximale',
        'Accès prioritaire aux missions',
        'Réductions boutique',
        'Support premium'
      ]
    }
  ];

  private userId = '69a74a3a0b84371d1323a85b';

  constructor(
    private router: Router,
    private subscriptionApi: SubscriptionApiService
  ) {}

  ngOnInit() {
    const storedRole = (localStorage.getItem('role') || '').toLowerCase();

    if (storedRole === 'client' || storedRole === 'freelancer') {
      this.role = storedRole;
    }
  }

  selectPlan(plan: PlanType) {
    this.selectedPlan = plan;
  }

  get selectedPlanData() {
    return this.plans.find(p => p.id === this.selectedPlan);
  }

  getPageTitle() {
    return this.role === 'client'
      ? 'Business Plan Client'
      : 'Business Plan Freelancer';
  }

  getPageHint() {
    return this.role === 'client'
      ? 'Choisissez un abonnement pour publier vos offres et trouver les meilleurs talents.'
      : 'Choisissez un abonnement pour développer votre activité et gagner en visibilité.';
  }

  getPlanFeatures(plan: any) {
    return this.role === 'client'
      ? plan.featuresClient
      : plan.featuresFreelancer;
  }

  continue() {
    if (!this.agreed) {
      alert('Veuillez accepter les conditions pour continuer.');
      return;
    }

    this.loading = true;

    this.subscriptionApi.activate(
      this.userId,
      this.agreed,
      this.autoRenew
    ).subscribe({
      next: () => {
        this.loading = false;

        if (this.role === 'client') {
          this.router.navigateByUrl('/tabs/services');
        } else {
          this.router.navigateByUrl('/tabs/jobs');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Activation échouée. Vérifiez le backend.');
      }
    });
  }
}