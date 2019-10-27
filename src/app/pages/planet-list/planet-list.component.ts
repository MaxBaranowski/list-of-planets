import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { PlanetBasicComponent } from '../../shared/planet.basic.component';
import { isNullOrUndefined } from 'util';
import { select, Store } from '@ngrx/store';
import { getPlanets, savePlanets } from '../../shared/actions/planet.actions';
import { Observable, pipe } from 'rxjs';

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
    current: null as number,
    amount: null as number,
  };
  searchedPlanet = '';
  planets$: Observable<{}>;

  constructor(private planetService: PlanetService, private store: Store<{ planets: any }>) {
    super(planetService);
    this.planets$ = store.pipe(select('planet'));
  }

  ngOnInit() {
    this.store.select('planet')
        .subscribe((state) => {
          this.listOfPlanets = state.planets ? state.planets : this.listOfPlanets;
          this.planetsPerPage = state.planetsPerPage ? state.planetsPerPage : this.planetsPerPage;
          this.pagination.current = state.page ? state.page : this.pagination.current;
          this.pagination.amount = state.pageAmount ? state.pageAmount : this.pagination.amount;
        });
    if (this.listOfPlanets.length < 1) {
      this.getPlanetsAll();
    }
  }

  ngOnDestroy(): void {
    if (this.planetListSubscription) {
      this.planetListSubscription.unsubscribe();
    }
  }

  searchPlanet() {
    this.listOfPlanets.length = 0;
    this.pagination.current = 1;
    this.store.dispatch(savePlanets({
      planets: [],
      page: 1
    }));
    this.getPlanetsAll();
  }

  clearSearchResults() {
    this.searchedPlanet = '';
    this.listOfPlanets.length = 0;
    this.pagination.current = 1;
    this.store.dispatch(savePlanets({
      planets: [],
      page: 1
    }));
    this.getPlanetsAll();
  }

  private getPlanetsAll() {
    this.showLoading();
    const startIDX = this.planetsPerPage * (this.pagination.current - 1) + 1;
    const startPage = Math.floor(startIDX / 10) + 1;
    const offset = startIDX - (startPage - 1) * 10 - 1;

    this.planetListSubscription = this.planetService.getPlanetsAll(startPage, this.searchedPlanet).subscribe({
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
          this.hideLoading();
          this.savePlanetsToStore.call(this);
        },
        error: err => this.error = `Smth went wrong, where is a problem with server:${err.message}`
      }
    );
  }


  private loadAdditionalPlanets(url) {
    this.showLoading();
    if (this.listOfPlanets.length < this.planetsPerPage) {
      this.planetListSubscription = this.planetService.getPlanets(url).subscribe({
        next: (planets) => {
          for (const planet of planets.results) {
            if (this.listOfPlanets.length < this.planetsPerPage) {
              this.listOfPlanets.push(planet);
            }
          }
          if (!isNullOrUndefined(planets.next)) {
            // console.log(planets.next);
            this.loadAdditionalPlanets(planets.next);
          }
          this.hideLoading();
          this.savePlanetsToStore.call(this);
        }
      });
    }

  }

  private savePlanetsToStore() {
    this.store.dispatch(savePlanets({
      planets: this.listOfPlanets,
      page: this.pagination.current,
      pageAmount: this.pagination.amount,
      planetsPerPage: this.planetsPerPage
    }));
  }

  changePlanetsAmount(planetAmount: number | string) {
    this.planetsPerPage = Number(planetAmount);
    this.listOfPlanets.length = 0;
    this.pagination.current = 1;
    this.store.dispatch(savePlanets({
      planets: [],
      page: 1,
      planetsPerPage: Number(planetAmount)
    }));
    this.getPlanetsAll();
    // console.log(this);
  }

  changePage(page) {
    this.listOfPlanets.length = 0;
    this.store.dispatch(savePlanets({
      planets: []
    }));
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
