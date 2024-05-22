import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { SelectComponent } from '../../components/select/select.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { flatMap } from 'lodash';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CardComponent, CommonModule, SelectComponent, LoaderComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
  providers: [CharactersService],
})
export class LocationsComponent implements OnInit {
  public list: any[] = [];
  public selectedLocation: number = 1;
  public name: string = '';
  public dimension: string = '';
  public type: string = '';
  public residents: any[] = [];
  public loading: boolean = false;
  public hasResidents: boolean = true;

  constructor(private characterService: CharactersService) {}

  ngOnInit(): void {
    this.getLocation(this.selectedLocation);
  }

  getLocation(selectedLocation: number) {
    this.loading = true;
    this.characterService.getLocation(selectedLocation).subscribe(
      (response) => {
        this.name = response.name;
        this.dimension = response.dimension;
        this.type = response.type;
        this.getCharactersByUrl((this.residents = response.residents));
      },
      (error) => {
        console.log(error);
        this.loading = false;
      },
    );
  }

  onLocationSelected(selectedLocation: number): void {
    this.selectedLocation = selectedLocation;
    this.getLocation(selectedLocation);
  }

  getCharactersByUrl(characterUrls: string[]) {
    if (!characterUrls || characterUrls.length === 0) {
      console.log('No se encontraron personajes para esta locacion.');
      this.hasResidents = false;
      this.loading = false;
      return;
    }
    const characterRequests = characterUrls.map((url) =>
      this.characterService.getCharacterByUrl(url),
    );
    forkJoin(characterRequests).subscribe(
      (response) => {
        this.list = response;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.hasResidents = false;
        this.loading = false;
      },
    );
  }
}
