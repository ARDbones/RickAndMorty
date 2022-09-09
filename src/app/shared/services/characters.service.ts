import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Character } from '../models/character.model';
import { catchError, retry, throwError } from 'rxjs';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})

export class CharactersService {
  
  private baseUrl : string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {  }

  getCharacters(url : string = this.baseUrl) {
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchCharacterByName(name : string){
    return this.http.get<any>(this.baseUrl + '/?name=' + name)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCharacterDetail(id : number) {
    return this.http.get<Character>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Location del metodo temporanea
  getEpisodesById(ids : any) { // sistemare il tipo
    return this.http.get<Episode[]>(this.baseUrl + '/' + ids)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
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
