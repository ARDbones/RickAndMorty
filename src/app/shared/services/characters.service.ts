import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})

export class CharactersService {
  
  private baseUrl : string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {  }

  getCharacters(page : number = 1) {
    return this.http.get<any>(this.baseUrl + '/?page=' + page);
  }

  searchCharacter(){
    return this.http.get<any>(this.baseUrl);
  }

  getCharacterDetail(id : number) {
    return this.http.get<Character>(this.baseUrl + '/' + id);
  }
}
