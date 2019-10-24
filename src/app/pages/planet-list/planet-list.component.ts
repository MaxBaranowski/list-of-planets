import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit , OnDestroy {

  planets;
  error;
  private planetListSubscription;

  constructor(private planetService: PlanetService) { }

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

}
