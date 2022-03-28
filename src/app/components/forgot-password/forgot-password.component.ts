import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService:AuthenticationService,
    private toast:HotToastService,
    private router:Router) { }

  passwordForm= new FormGroup({
    email:new FormControl(''),
    })
  ngOnInit(): void {
  }
  forgotPassword(){
    this.authService.forgotPassword(this.passwordForm.value.email);
  }
}
