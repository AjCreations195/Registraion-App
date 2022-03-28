import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { canActivate,redirectLoggedInTo,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const redirectToLogin =()=>redirectUnauthorizedTo(['login']);
const redirectToHome =() =>redirectLoggedInTo(['home'])
const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:LandingComponent},
  {path:'profile',component:ProfileComponent, ...canActivate(redirectToLogin)},
  {path:'login',component:LoginComponent, ...canActivate(redirectToHome)},
  {path:'sign-up',component:SignupComponent,...canActivate(redirectToHome)},
{path:'verify-email',component:VerifyEmailComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
