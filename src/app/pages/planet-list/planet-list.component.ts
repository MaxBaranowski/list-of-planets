import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { PlanetBasicComponent } from '../../shared/planet.basic.component';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent extends PlanetBasicComponent implements OnInit, OnDestroy {

  planets;
  error;
  private planetListSubscription;

  constructor(private planetService: PlanetService) {
    super(planetService);
  }

  ngOnInit() {
    this.planetListSubscription = this.planetService.getList().subscribe({
        next: planets => this.planets = planets.results,
        error: err => this.error = err || 'No data'
      }
    );
  }

  ngOnDestroy(): void {
    this.planetListSubscription.unsubscribe();
  }

  public parseUrl(name: any, action: string) {
    switch (action) {
      case 'removeSpaces':
        return name.replace(/ /g, '_');
      default:
        return name;
    }
  }
}
