import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/user-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  constructor(private authService:AuthenticationService,
    private userService:UsersService) { }

  ngOnInit(): void {
  }

}
