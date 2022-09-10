import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Character } from '../models/character.model';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CharacterResponse } from '../models/character-response.model';

interface GraphqlResponse {
  data : {
    character : {
      episode : { name : string; episode : string; }[]
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CharactersService {
  
  private baseUrl : string = 'https://rickandmortyapi.com/api/character/';
  private graphqlUrl : string = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {  }

  getCharacters(url : string = this.baseUrl) : Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCharacterByName(name : string) : Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.baseUrl + '?name=' + name)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCharactersById(ids : string) : Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + ids)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCharacterDetail(id : number) : Observable<Character> {
    return this.http.get<Character>(this.baseUrl + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCharacterEpisodesName(id : number) : Observable<GraphqlResponse> {
    return this.http.post<GraphqlResponse>(this.graphqlUrl, { query : 'query { character(id: ' + id + ') { episode { name episode } }}'})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) : Observable<never> {
    if (err.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', err.error);
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned code ${err.status}, body was: `, err.error);
      alert('An error occurred: ' + err.error.error);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
