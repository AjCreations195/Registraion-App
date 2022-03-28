import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  constructor(private authService:AuthenticationService,
    private router:Router,
    private toast :HotToastService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.loginForm.valid){
        return ;
    }
    const {email,password} = this.loginForm.value;
    this.authService.login(email,password).pipe(this.toast.observe({
      success:'Logged in Succesfully',
      loading:'Logging in...',
      error:({message})=>`${message}`,
    })).subscribe(()=>{
        this.router.navigate(['/home']);
    })
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
