import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';
import { FavoritesService } from '../shared/services/favorites.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  nameSearched : string = '';
  charList : Character[] = [];
  page : number = 1;
  maxPages : number = 1;
  selectedId : number = 1;
  previousPageUrl : string = '';
  nextPageUrl : string = '';
  favList : number[] = [];

  constructor(private pageService : CharactersService, private modalService : ModalService, private favService : FavoritesService) { }
  
  ngOnInit(): void {
    this.pageService.getCharacters().subscribe(response =>  {
      this.previousPageUrl = response.info.prev;
      this.nextPageUrl = response.info.next;
      this.maxPages = response.info.pages;
      this.charList = response.results;
    });

    this.favService.getFavoritesState().subscribe(favs =>{
      this.favList = favs;
    })
  }

  previousPage() : void {
    if(this.previousPageUrl)
      this.pageService.getCharacters(this.previousPageUrl).subscribe(response =>  {
        this.charList = response.results;
        this.previousPageUrl = response.info.prev;
        this.nextPageUrl = response.info.next;
        this.maxPages = response.info.pages;
        this.page--;
      });
  }

  nextPage() : void {
    if(this.nextPageUrl)
      this.pageService.getCharacters(this.nextPageUrl).subscribe(response =>  {
        this.charList = response.results;
        this.previousPageUrl = response.info.prev;
        this.nextPageUrl = response.info.next;
        this.maxPages = response.info.pages;
        this.page++;
      });
  }

  openDetails(id : number) : void {
    this.modalService.setCharacterId(id);
  }

  addToFavorites(id : number) : void {
    this.favService.addFavorite(id);
  }

  removeFromFavorites(id : number) : void {
    this.favService.removeFavorite(id);
  }

  isFavorite(id : number) : boolean {
    if(this.favList.find(el => el == id)) return true
    else return false;
  }

  searchCharacter() : void {
    if(this.nameSearched){
      this.pageService.getCharacterByName(this.nameSearched).subscribe(response =>  {
        this.charList = response.results;
        this.previousPageUrl = response.info.prev;
        this.nextPageUrl = response.info.next;
        this.page = 1;
        this.maxPages = response.info.pages;
      });
    } else this.pageService.getCharacters().subscribe(response =>  {
      this.previousPageUrl = response.info.prev;
      this.nextPageUrl = response.info.next;
      this.charList = response.results;
      this.maxPages = response.info.pages;
      this.page = 1;
    });
  }
}