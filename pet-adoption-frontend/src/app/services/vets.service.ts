import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VetsService {
  private apiUrl = 'http://127.0.0.1:5000/api/vets';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/areas`);
  }

  getVetsByArea(area: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?area=${area}`);
  }
}

