import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/user-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private userSub!: Subscription;
  isAuthenticated = false;
 
  user$ = this.userService.currentUserProfile$;
  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private userService:UsersService
  ) { }

    
 
  ngOnInit(): void {
   
  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate([''])
    })
  }
}
