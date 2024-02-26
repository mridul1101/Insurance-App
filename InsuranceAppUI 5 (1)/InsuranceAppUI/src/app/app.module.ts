import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginSignUpService } from './login-sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { AuthzGuard } from './Services/auth.guard';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { PolicyService } from './Services/policy.service';
import { provideAnimations } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: '', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcomepage', component: WelcomepageComponent,canActivate:[AuthzGuard] },
  { path: 'policieslist', component: PoliciesListComponent,canActivate:[AuthzGuard]},
  { path: 'policiesdetails', component: PolicyDetailsComponent,canActivate:[AuthzGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    WelcomepageComponent,
    PoliciesListComponent,
    PolicyDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),  
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginSignUpService,
    PolicyService,
    AuthzGuard,
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
