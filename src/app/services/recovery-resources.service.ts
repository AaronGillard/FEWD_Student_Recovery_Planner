import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecoveryResource {
  title: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecoveryResourcesService {
  private resourcesUrl =
    'https://raw.githubusercontent.com/AaronGillard/FEWD_Student_Recovery_Planner/main/src/assets/data/recovery-resources.json';

  constructor(private http: HttpClient) {}

  getResources(): Observable<RecoveryResource[]> {
    return this.http.get<RecoveryResource[]>(this.resourcesUrl);
  }
}