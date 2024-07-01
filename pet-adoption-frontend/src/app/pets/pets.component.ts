import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  selectedPetType: 'dog' | 'cat' | null = null;
  pets: any[] = [];
  petTypes = ['dog', 'cat'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onPetTypeChange() {
    if (this.selectedPetType) {
      this.loadPets(this.selectedPetType);
    } else {
      this.pets = [];
    }
  }

  loadPets(petType: 'dog' | 'cat') {
    const petData = {
      dog: [
        { name: 'Max', description: 'Energetic and friendly dog who loves running and playing fetch. Enjoys baths and grooming. Age: 2 years old', image: 'dog1.jpg' },
        { name: 'Bella', description: 'Loyal and loving dog who enjoys long walks and snuggling on the couch. Age: 3 years old', image: 'dog2.jpg' },
        { name: 'Charlie', description: 'Active and playful puppy who enjoys playing with his favorite toys. Age: 4 months old', image: 'dog3.jpg' },
        { name: 'Daisy', description: 'Gentle and affectionate dog who loves spending time with her human family. Enjoys hicking and walking at the beach. Very gentle with kids. Age: 4 years old', image: 'dog4.jpg' }
      ],
      cat: [
        { name: 'Fluffy', description: 'Gentle and affectionate cat who loves to cuddle and play with feather toys. Enjoys kids company and is friendly with other cats. Age: 2 years old', image: 'cat1.jpg' },
        { name: 'Whiskers', description: 'Adventurous cat with a playful personality. Enjoys exploring new places. Not very friendly with other cats but loves dogs. Age: 3 years old', image: 'cat2.jpg' },
        { name: 'Luna', description: 'Calm and serene cat who loves lounging by the window and watching the world go by. Spends a lot of time grooming and loves being groomed from her human as well. Age: 4 years old', image: 'cat3.jpg' },
        { name: 'Mittens', description: 'Friendly and curious cat who enjoys chasing laser pointers and playing fetch. Loves other cats and especially kittens. Age: 2 years old', image: 'cat4.jpg' },
        { name: 'Oliver', description: 'Sweet and gentle cat who loves being petted and enjoys a warm lap to snuggle on. He will make you laugh with his efforts to climb everywhere in the house. Age: 1 years old', image: 'cat5.jpg' }
      ]
    };

    this.pets = petData[petType] || [];
  }
}
