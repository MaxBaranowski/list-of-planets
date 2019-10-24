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
}
