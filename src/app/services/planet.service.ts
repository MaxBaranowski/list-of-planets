import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PlanetService {
  constructor(private http: HttpClient) {}

  getList(): Observable<object> {
    return this.http.get(`https://swapi.co/api/planets/?format=json`)
               .pipe(map(res => res));
  }

  getPlanet(planetId): Observable<object> {
    return this.http.get(`https://swapi.co/api/planets/${planetId}`)
               .pipe(map(res => res));
  }
}

interface PlanetListInterface {
  count: number;
  next: string;
  previous?: string;
  name: string;
  url: string;
  results: any;
}
