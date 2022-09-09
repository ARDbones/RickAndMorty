import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';
import { FavouritesService } from '../shared/services/favourites.service';
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

  constructor(private pageService : CharactersService, private modalService : ModalService, private favService : FavouritesService) { }
  
  ngOnInit(): void {
    this.pageService.getCharacters().subscribe(response =>  {
      this.previousPageUrl = response.info.prev;
      this.nextPageUrl = response.info.next;
      this.maxPages = response.info.pages;
      this.charList = response.results;
    });

    this.favService.getFavouritesState().subscribe(favs =>{
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
    this.selectedId = id;
    this.modalService.openModal('detail-modal');
  }

  addToFavourites(id : number) : void {
    this.favService.addFavourite(id);
  }

  removeFromFavourites(id : number) : void {
    this.favService.removeFavourite(id);
  }

  isFavourite(id : number) : boolean {
    if(this.favList.find(el => el == id)) return true
    else return false;
  }

  searchCharacter() : void {
    if(this.nameSearched){
      this.pageService.searchCharacterByName(this.nameSearched).subscribe(response =>  {
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