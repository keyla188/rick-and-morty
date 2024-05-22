import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = 'https://rickandmortyapi.com/api';
  }

  getCharacters(page: number, search: string): Observable<any> {
    console.log(page);
    console.log(search);
    return this._http.get<any>(
      `${this.url}/character?page=${page}&name=${search}`,
    );
  }

  getCharacter(id: number): Observable<any> {
    return this._http.get<any>(this.url + '/character/' + id);
  }

  getCharactersStatus(status: string): Observable<any> {
    return this._http.get<any>(`${this.url}/character?status=${status}`);
  }

  getLocation(id: number): Observable<any> {
    return this._http.get<any>(this.url + '/location/' + id);
  }

  getEpisode(id: number): Observable<any> {
    return this._http.get<any>(this.url + '/episode/' + id);
  }

  getCharacterByUrl(url: string): Observable<any> {
    return this._http.get<any>(url);
  }
}
