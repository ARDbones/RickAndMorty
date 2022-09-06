import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  charList : Character[] = [];
  page : number = 1;
  maxPages : number = 1;

  constructor(private pageService : CharactersService) { }
  
  ngOnInit(): void {
    this.pageService.getCharacters(1).subscribe(response =>  {
      this.maxPages = response.info.pages;
      this.charList = response.results;
    });
  }

  previousPage() : void {
    if(this.page > 1)
      this.pageService.getCharacters(this.page - 1).subscribe(response =>  {
        this.charList = response.results;
        this.maxPages = response.info.pages;
        this.page--;
      });
  }

  nextPage() : void {
    if(this.page < this.maxPages)
      this.pageService.getCharacters(this.page + 1).subscribe(response =>  {
        this.charList = response.results;
        this.maxPages = response.info.pages;
        this.page++;
      });
  }

  openDetails() : void {

  }

  searchCharacter() : void {
    this.pageService.searchCharacter().subscribe(response =>  {
      this.charList = response.results;
      this.page = 1;
      this.maxPages = response.info.pages;
    });
  }
}

// TODO: non c'è la gestione degli errori