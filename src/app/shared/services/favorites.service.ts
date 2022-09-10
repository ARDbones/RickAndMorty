import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesIdList : number[] = [];
  private favSubject = new BehaviorSubject<any>([]);

  constructor() {}

  public getFavoritesState() {
    return this.favSubject.asObservable();
  }

  addFavorite(id : number){
    this.favoritesIdList.push(id)
    this.favSubject.next(this.favoritesIdList);
  }

  removeFavorite(id : number){
    const index = this.favoritesIdList.indexOf(id);
    this.favoritesIdList.splice(index,1);
    this.favSubject.next(this.favoritesIdList);
  }
}