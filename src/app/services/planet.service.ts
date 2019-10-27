import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PlanetService {
  constructor(private http: HttpClient) {}

  getPlanetsAll(page = 1): Observable<PlanetsResponse> {
    return this.http.get<PlanetsResponse>(`https://swapi.co/api/planets/?format=json&page=${page}`)
               .pipe(map(res => res));
  }

  getPlanetByID(planetId): Observable<object> {
    return this.http.get(`https://swapi.co/api/planets/${planetId}`)
               .pipe(map(res => res));
  }

  getPlanetsByURL(url: string): Observable<PlanetsResponse> {
    return this.http.get<PlanetsResponse>(`${url}`)
               .pipe(map(res => res));
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
