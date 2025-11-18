import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  private apiKey = '0ada432b59deb9716c357092c5f79be6';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) { }

  // Méteo du jour
  getMeteo(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}weather?q=${city}&lang=fr&appid=${this.apiKey}&units=metric`);
  }

  // Méteo sur 5 jours
  getMeteo5Jours(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}forecast?q=${city}&lang=fr&appid=${this.apiKey}&units=metric`);
  }
}
