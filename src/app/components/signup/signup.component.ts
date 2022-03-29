import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import {  switchMap} from 'rxjs';
import {ImageUploadService} from '../../services/image-upload.service'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageCroppedEvent, } from 'ngx-image-cropper';
import { UsersService } from 'src/app/services/user-service';

export function passwordsMatchValidator():ValidatorFn{
  return (control:AbstractControl) : ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return{
        passwordsDontMatch:true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  selectedValue='';
  imageChangedEvent: any = '';
    croppedImage: any = '';
  Categories =['customer','employee']
  signupForm = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',Validators.required),
    file:new FormControl(null)

  },
  {validators: passwordsMatchValidator()})
  file:any;
  constructor(private authService:AuthenticationService,
    private toast:HotToastService,
    private router :Router,
    private imageUploadService:ImageUploadService,
    private userService:UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.signupForm.valid)  return;

    console.log("photo",this.file);
    
    const {name,email,password}= this.signupForm.value;
    this.authService.signUp(email,password).pipe(
      switchMap(({ user : { uid }})=>this.userService.addUser({uid , email , displayName:name})),
      this.toast.observe({
      success:'Congrats! You are signed up',
      loading:'Signing in...',
      error: ({message})=>`${message}`,
    })).subscribe(()=>{
    this.router.navigate(['/home'])})


  }

  onFileSelected(event :any){}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
 

  get name(){
    return this.signupForm.get('name');
  }
  get email(){
    return this.signupForm.get('email');
  }
  get password(){
    return this.signupForm.get('password');
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }
}
