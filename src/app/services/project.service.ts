import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  api = 'http://127.0.0.1:5000/api/projects';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

getMyProjects() {
  const token = localStorage.getItem('token');

  return this.http.get<any[]>(`${this.api}/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  addUpdate(projectId: string, milestoneId: string, data: any) {
    return this.http.post(
      `${this.api}/${projectId}/milestones/${milestoneId}/update`,
      data,
      this.getHeaders()
    );
  }

  validateMilestone(projectId: string, milestoneId: string) {
    return this.http.put(
      `${this.api}/${projectId}/milestones/${milestoneId}/validate`,
      {},
      this.getHeaders()
    );
  }

  addMilestone(projectId: string, data: any) {
    return this.http.post(
      `${this.api}/${projectId}/milestones`,
      data,
      this.getHeaders()
    );
  }
}