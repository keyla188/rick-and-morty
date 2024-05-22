import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../components/select/select.component';
import { CardComponent } from '../../components/card/card.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CardComponent, CommonModule, SelectComponent, LoaderComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
  providers: [CharactersService]
})
export class EpisodesComponent implements OnInit {

  public list: any[] = [];
  public episodes: any[] = [];
  public selectedEpisode: number = 1;
  public name: string = '';
  public airDate: string = '';
  public residents: any[] = [];
  public loading: boolean = false;
  public hasCharacters: boolean = true;

  constructor(private characterService: CharactersService) {

  }

  ngOnInit(): void {
    this.getEpisode(this.selectedEpisode);
  }


  getEpisode(selectedEpisode: number) {
    this.loading = true;
    this.characterService.getEpisode(selectedEpisode).subscribe(
      response => {
        this.name = response.name;
        this.airDate = response.air_date;
        this.getCharactersByUrl(this.residents = response.characters)
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    )
  }

  onEpisodeSelected(selectedEpisode: number): void {
    this.selectedEpisode = selectedEpisode;
    this.getEpisode(selectedEpisode);
  }

  getCharactersByUrl(characterUrls: string[]) {

    if (!characterUrls || characterUrls.length === 0) {
      this.hasCharacters = false;
      this.loading = false;
      return;
    }

    const characterRequests = characterUrls.map(url => this.characterService.getCharacterByUrl(url));

    forkJoin(characterRequests).subscribe(
      response => {
        this.list = response;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.hasCharacters = false;
        this.loading = false;
      }
    );
  }

}
