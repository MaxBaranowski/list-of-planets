import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlanetComponent } from './pages/planet-list/components/planet/planet.component';
import { PlanetListComponent } from './pages/planet-list/planet-list.component';
import { PlanetDetailComponent } from './pages/planet-detail/planet-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PlanetService } from './services/planet.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './shared/reducers/planet.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailComponent,
    NotFoundComponent,
    LoadingComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgbPaginationModule,
    StoreModule.forRoot({planet: reducer})
  ],
  providers: [PlanetService],
  bootstrap: [AppComponent]
})
export class AppModule {}
