import { Component, Input, OnInit } from '@angular/core';
import { PlanetBasicComponent } from '../../shared/planet.basic.component';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent extends PlanetBasicComponent implements OnInit {

  planet;
  error;
  @Input() planetId: string;

  constructor(private planetService: PlanetService, private route: ActivatedRoute) {
    super(planetService, route);
  }

  ngOnInit() {

    this.route.params.subscribe(param => this.planetId = param.id);

    this.planetService.getPlanetByID(this.planetId).subscribe({
        next: planet => this.planet = planet,
        error: err => this.error = err || 'No data'
      }
    );
  }

}
