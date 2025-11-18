import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf, *ngFor, pipes
import { FormsModule } from '@angular/forms';    // ngModel si nécessaire
import { RouterModule } from '@angular/router';  // routerLink
import { MeteoService } from '../service/meteo.service';

// Interface pour typer correctement les objets de la réponse 5 jours
interface MeteoItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: { id: number; description: string }[];
}

interface Meteo5JoursResponse {
  list: MeteoItem[];
}

@Component({
  selector: 'app-meteo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css']
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  meteo5Jours: MeteoItem[] = [];
  cityName: string = 'Paris';

  constructor(private meteoService: MeteoService) { }

  ngOnInit(): void {
    // Météo du jour
    this.meteoService.getMeteo(this.cityName).subscribe((data: any) => {
      this.meteo = data;
    });

    // Prévisions sur 5 jours
    this.meteoService.getMeteo5Jours(this.cityName)
      .subscribe((data: Meteo5JoursResponse) => {
        this.meteo5Jours = data.list;
      });
  }
}
