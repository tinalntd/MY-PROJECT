import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-vets',
  templateUrl: './vets.component.html',
  styleUrls: ['./vets.component.scss']
})
export class VetsComponent implements OnInit {
  areas: string[] = [];
  selectedArea: string | null = null;
  vets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVetAreas();
  }

  loadVetAreas() {
    this.http.get<string[]>(`${environment.apiUrl}/vets/areas`).subscribe(
      (response) => {
        console.log('Fetched vet areas:', response);  // Debug log
        this.areas = response;
      },
      (error) => {
        console.error('Error fetching vet areas:', error);
      }
    );
  }

  onAreaChange() {
    if (this.selectedArea) {
      this.http.get<any[]>(`${environment.apiUrl}/vets?area=${this.selectedArea}`).subscribe(
        (response) => {
          console.log('Fetched vets for selected area:', response);  // Debug log
          this.vets = response;
        },
        (error) => {
          console.error('Error fetching vets for the selected area:', error);
        }
      );
    } else {
      this.vets = [];
    }
  }
}
