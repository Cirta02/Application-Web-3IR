import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MeteoComponent {
  city: any = { name: '' };
  cityList: any[] = [];

  onSubmit() {
    if (this.city.name) {
      this.cityList.push({ ...this.city });
      this.city.name = ''; // reset champ input
    }
  }

  remove(city: any) {
    this.cityList = this.cityList.filter(c => c !== city);
  }
}
