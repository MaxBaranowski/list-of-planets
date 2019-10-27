import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { PlanetBasicComponent } from '../../shared/planet.basic.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent extends PlanetBasicComponent implements OnInit, OnDestroy {

  totalPlanets = []; // planets returned from API ??? todo caching ????
  listOfPlanets = []; // planets to use
  error; // error message if smth went wrong, exp: heroku dies
  private planetListSubscription;
  availablePlanetsPerPage: Array<number> = [5, 10, 25, 100];
  planetsPerPage: number = this.availablePlanetsPerPage[0]; // chosen option how many planets will be shown per page
  pagination = {
    current: 1 as number,
    amount: null as number,
  };

  constructor(private planetService: PlanetService) {
    super(planetService);
  }

  ngOnInit() {
    this.getPlanetsAll();
  }

  ngOnDestroy(): void {
    this.planetListSubscription.unsubscribe();
  }

  private getPlanetsAll() {
    const startIDX = this.planetsPerPage * (this.pagination.current - 1) + 1;
    const startPage = Math.floor(startIDX / 10) + 1;
    const offset = startIDX - (startPage - 1) * 10 - 1;

    this.planetListSubscription = this.planetService.getPlanetsAll(startPage).subscribe({
        next: (planets) => {
          // this.totalPlanets = planets.results; // todo caching request ????
          for (const planet of planets.results.slice(offset)) {
            if (this.listOfPlanets.length < this.planetsPerPage) {
              this.listOfPlanets.push(planet);
            }
          }
          this.pagination.amount = Number(planets.count);
          if (!isNullOrUndefined(planets.next)) {
            this.loadAdditionalPlanets(planets.next);
          }
        },
        error: err => this.error = `Smth went wrong, where is a problem with server:${err.message}`
      }
    );
  }


  private loadAdditionalPlanets(url) {
    if (this.listOfPlanets.length < this.planetsPerPage) {
      this.planetListSubscription = this.planetService.getPlanetsByURL(url).subscribe({
        next: (planets) => {
          for (const planet of planets.results) {
            if (this.listOfPlanets.length < this.planetsPerPage) {
              this.listOfPlanets.push(planet);
            }
          }
          if (!isNullOrUndefined(planets.next)) {
            console.log(planets.next);
            this.loadAdditionalPlanets(planets.next);
          }
        }
      });
    }

  }

  changePlanetsAmount(planetAmount: number | string) {
    this.planetsPerPage = Number(planetAmount);
    this.listOfPlanets.length = 0;
    this.pagination.current = 1;
    this.getPlanetsAll();

    // console.log(this);
  }

  changePage(page) {
    this.listOfPlanets.length = 0;
    this.getPlanetsAll();
  }

  public parseUrl(param: any, action: string) {
    switch (action) {
      case 'removeSpaces':
        return param.replace(/ /g, '_');
      case 'getId':
        return param.slice(0, -1).split('/').pop();
      default:
        return param;
    }
  }

}
