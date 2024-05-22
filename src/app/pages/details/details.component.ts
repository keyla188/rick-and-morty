import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../services/characters.service';
import { CardComponent } from '../../components/card/card.component';
import { ViewportScroller } from '@angular/common';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  providers: [CharactersService],
})
export class DetailsComponent implements OnInit {
  characterData: any;
  listStatus: any[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private characterService: CharactersService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getCharacter(id);
    });
  }

  getCharacter(id: number) {
    this.characterService.getCharacter(id).subscribe(
      (response) => {
        this.characterData = response;
        this.getCharactersStatus(this.characterData.status);
        this.viewportScroller.scrollToPosition([0, 0]);
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  getCharactersStatus(status: string) {
    this.characterService.getCharactersStatus(status).subscribe(
      (response) => {
        this.listStatus = shuffle(response.results).slice(0, 3);
        console.log(this.listStatus);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
