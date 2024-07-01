import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets/pets.component';
import { VetsComponent } from './vets/vets.component';
import { AdoptionTipsComponent } from './adoption-tips/adoption-tips.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';  

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent, 
    PetsComponent,
    VetsComponent,
    SignInComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    CommonModule,
    AdoptionTipsComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        AuthInterceptor  
      ]),
      withFetch()  
    ),
    AuthGuard  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
