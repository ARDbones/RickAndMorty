import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesIdList : number[] = [];
  private favSubject : BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor() {}

  public getFavoritesState() : Observable<number[]>{
    return this.favSubject.asObservable();
  }

  addFavorite(id : number) : void {
    this.favoritesIdList.push(id)
    this.favSubject.next(this.favoritesIdList);
  }

  removeFavorite(id : number) : void {
    const index = this.favoritesIdList.indexOf(id);
    this.favoritesIdList.splice(index,1);
    this.favSubject.next(this.favoritesIdList);
  }
}