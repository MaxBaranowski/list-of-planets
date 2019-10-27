import { Component, Input, OnInit } from '@angular/core';
import { PlanetBasicComponent } from '../../shared/planet.basic.component';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute } from '@angular/router';
import { getPlanetImage } from 'src/app/shared/helper';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent extends PlanetBasicComponent implements OnInit {

  planet;
  error;
  @Input() planetId: string;
  residents: Array<string> = [];

  constructor(private planetService: PlanetService, private route: ActivatedRoute) {
    super(planetService, route);
  }

  ngOnInit() {

    this.route.params.subscribe(param => {
      this.showLoading();
      this.planetId = param.id;
    });

    this.planetService.getPlanetByID(this.planetId).subscribe({
        next: planet => {
          this.planet = planet;
          // @ts-ignore
          planet.residents.forEach(resident => this.getResident(resident));
          this.hideLoading();
        },
        error: err => this.error = err || 'No data'
      }
    );
  }

  getResident(resident: string) {
    this.planetService.getResidentInfo(resident).subscribe(data => {
      // @ts-ignore
      this.residents.push(data.name);
    });
  }
}
