import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adoption-tips',
  templateUrl: './adoption-tips.component.html',
  styleUrls: ['./adoption-tips.component.scss'],
  standalone: true,
  imports: [CommonModule] 
})
export class AdoptionTipsComponent {
  selectedTab: 'dogs' | 'cats' = 'dogs';

  selectTab(tab: 'dogs' | 'cats') {
    this.selectedTab = tab;
  }
}


