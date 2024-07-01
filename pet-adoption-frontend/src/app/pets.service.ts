import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getPets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pets`);
  }

  adoptPet(petId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/adopt`, { pet_id: petId, user_id: userId });
  }
}
