import { Component, Input, OnInit } from '@angular/core';
import { getPlanetImage } from 'src/app/shared/helper';

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
    return getPlanetImage(url);
  }

  public imageErrorHandler(event) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Death_star1.png/220px-Death_star1.png';
  }
}
