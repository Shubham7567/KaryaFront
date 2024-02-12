import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, map } from 'rxjs';

export class WeatherData {
  date: Date;
  temperatureC:number;
  temperatureF: number;
  summary: string;
  constructor(){
    this.date = new Date();
    this.temperatureC = 0;
    this.temperatureF = 0;
    this.summary = '';
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule,HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data:Observable<Array<WeatherData>> = new Observable<Array<WeatherData>>();
  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary'];

  constructor(private http:HttpClient,public oidcSecurityService: OidcSecurityService){
    var token = '';
    this.oidcSecurityService.getAccessToken().subscribe(res => {
      token = res;
    });
    this.data = this.http.get("https://localhost:7160/WeatherForecast",{headers: new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `bearer ${token}`
    })}).pipe(map((res:any) => { return res as WeatherData[]; }))
  }
}
