import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PlanetService {
  constructor(private http: HttpClient) {}

  getList(): Observable<PlanetListInterface> {
    return this.http.get<PlanetListInterface>(`https://swapi.co/api/planets/?format=json`)
               .pipe(map(res => {
                   return res;
                 })
               );
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
