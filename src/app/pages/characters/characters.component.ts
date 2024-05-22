import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CharactersService } from '../../services/characters.service';
import { CardComponent } from '../../components/card/card.component';
import { ViewportScroller } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule, NgxPaginationModule, LoaderComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  providers: [CharactersService],
})
export class CharactersComponent implements OnInit {

  public list: any[] = []
  public search: string = '';
  public listFiltered: string[] = [];
  public totalItems: number = 0;
  public p: number = 1;
  public loading: boolean = false;

  constructor(private characterService: CharactersService, private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {

    this.getCharacters(this.p, this.search);
  }

  getCharacters(page: number, search: string) {
    this.loading = true
    this.characterService.getCharacters(page, search).subscribe(
      (response: any) => {
        this.list = response.results;
        this.totalItems = response.info.count;
        this.listFiltered = this.list
        this.loading = false
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      (error) => {
        console.log(error);
        this.loading = false
      }
    );
  }


  goToPage(pageNumber: number) {
    this.p = pageNumber;
    this.getCharacters(this.p, this.search);
  }

  onSearch() {
    const searchTermLowerCase = this.search.toLowerCase();
    this.p = 1;
    this.getCharacters(this.p, searchTermLowerCase);
  }



}
