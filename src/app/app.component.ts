import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KaryaFront';
  constructor(public oidcSecurityService: OidcSecurityService){
  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: any) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;

        /*...*/
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    
    this.oidcSecurityService
      .logoffAndRevokeTokens().subscribe(res => {
        console.log(res);
      })
  }
}
