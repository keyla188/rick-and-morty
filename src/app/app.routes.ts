import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personajes', component: CharactersComponent },
  { path: 'episodios', component: EpisodesComponent },
  { path: 'locaciones', component: LocationsComponent },
  { path: 'personaje/:id', component: DetailsComponent },
];
