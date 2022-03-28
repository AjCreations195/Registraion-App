import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, } from 'rxjs';
import { User } from '@angular/fire/auth'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;

  selectedValue = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private imageUploadService: ImageUploadService) { }


  ngOnInit(): void {
  }
 

  uploadImage(event: any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading: 'Image is uploading...',
        success: 'Image Uploaded Successfully',
        error: 'There was an error'
      }), concatMap((photoURL) => this.authService.updateProfileData({ photoURL }))
    ).subscribe();
  }

  onFileSelected(event: any) { }

  fileChangeEvent(event: any, user: User): void {
    this.imageChangedEvent = event;
    this.uploadImage(this.imageChangedEvent,user)
  }
  imageCropped(event: ImageCroppedEvent, user: User) {
    this.croppedImage = event.base64
   }

}
