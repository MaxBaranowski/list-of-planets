import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  @Input() planet;

  constructor() { }

  ngOnInit() {
  }

  public getPlanetImage(url: string): string {
    const planetId = url.slice(0, -1).split('/').pop();
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  }

  public imageErrorHandler(event) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Death_star1.png/220px-Death_star1.png';
  }
}
