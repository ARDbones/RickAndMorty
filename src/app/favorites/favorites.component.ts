import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';
import { FavoritesService } from '../shared/services/favorites.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favList : number[] = [];
  fullCharList : Character[] = [];
  charList : Character[] = [];
  page : number = 1;
  maxPages : number = 1;
  resultsPerPage : number = 20;

  constructor(private charService : CharactersService, private favService : FavoritesService, private modalService : ModalService) { }

  ngOnInit(): void {
    this.favService.getFavoritesState().subscribe(favs =>{
      this.favList = favs;
      if(this.favList.length > 0){
        this.charService.getCharactersById(this.favList.toString()).subscribe(response =>{
          this.fullCharList = response;
          this.maxPages = Math.floor(this.fullCharList.length / this.resultsPerPage);
          if(this.fullCharList.length % this.resultsPerPage != 0) this.maxPages++;
  
          if(this.page == this.maxPages) {
            this.charList = this.fullCharList.slice(0, this.fullCharList.length); // pagina incompleta o pari alla length
          } else {
            this.charList = this.fullCharList.slice(0, this.resultsPerPage); // pagina piena
          }
        })
      }
    })
  }

  openDetails(id : number) : void {
    this.modalService.setCharacterId(id);
  }

  previousPage() : void {
    this.page--;
    this.charList = this.fullCharList.slice(this.resultsPerPage * (this.page - 1), this.resultsPerPage * this.page);
  }

  nextPage() : void {
    this.page++;
    if(this.page == this.maxPages) {
      this.charList = this.fullCharList.slice(this.resultsPerPage * (this.page - 1), this.fullCharList.length); // pagina incompleta o pari alla length
    } else {
      this.charList = this.fullCharList.slice(this.resultsPerPage * (this.page - 1), this.resultsPerPage * this.page); // pagina piena
    }
  }
}