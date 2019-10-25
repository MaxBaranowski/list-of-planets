import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetListComponent } from './pages/planet-list/planet-list.component';
import { PlanetDetailComponent } from './pages/planet-detail/planet-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  {
    path: '', component: PlanetListComponent, children: [
      {
        path: '', redirectTo: '/', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'planets', component: PlanetListComponent
  },
  {
    path: 'planet/:id', component: PlanetDetailComponent
  },
  {
    path: '**', component: NotFoundComponent

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
