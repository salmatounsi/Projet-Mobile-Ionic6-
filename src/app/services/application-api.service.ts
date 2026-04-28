import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5000';

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      Authorization: `Bearer ${token}`
    };
  }

  applyToJob(jobId: string, formData: FormData) {
    return this.http.post(
      `${this.api}/api/jobs/${jobId}/apply`,
      formData,
      { headers: this.getHeaders() }
    );
  }

  getJobApplications(jobId: string) {
    return this.http.get<any[]>(
      `${this.api}/api/jobs/${jobId}/applications`,
      { headers: this.getHeaders() }
    );
  }

  rejectApplication(applicationId: string) {
    return this.http.put(
      `${this.api}/api/applications/${applicationId}/reject`,
      {},
      { headers: this.getHeaders() }
    );
  }

  startChat(applicationId: string) {
    return this.http.post<any>(
      `${this.api}/api/applications/${applicationId}/start-chat`,
      {},
      { headers: this.getHeaders() }
    );
  }
}