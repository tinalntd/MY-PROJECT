import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdoptionTipsComponent } from './adoption-tips/adoption-tips.component';
import { VetsComponent } from './vets/vets.component';
import { PetsComponent } from './pets/pets.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'adoption-tips', component: AdoptionTipsComponent },
  { path: 'vets', component: VetsComponent },
  { path: 'pets', component: PetsComponent, canActivate: [AuthGuard] },  
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
