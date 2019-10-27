import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({providedIn: 'root'})
export class PlanetService {
  constructor(private http: HttpClient) {}

  private planetApiURL = 'https://swapi.co/api/planets/';

  public getPlanets(url = this.planetApiURL): Observable<PlanetsResponse> {
    return this.http.get<PlanetsResponse>(url);
  }

  public getPlanetByID(planetId) {
    return this.getPlanets(`${this.planetApiURL}${planetId}`);
  }

  public getPlanetsAll(page = 1, searchPlanet = null) {
    let url = `${this.planetApiURL}?page=${page}`;
    if (!isNullOrUndefined(searchPlanet)) {
      url += `&search=${searchPlanet}`;
    }
    return this.getPlanets(url);
  }

}

interface PlanetsResponse {
  count: number;
  next: string;
  previous?: string;
  name: string;
  url: string;
  results: any;
}
