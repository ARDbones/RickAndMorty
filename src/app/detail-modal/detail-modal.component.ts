import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() charId = 1;
  character : Character = {
    id : this.charId,
    name : 'loading',
    status : 'loading',
    species : 'loading',
    type : 'loading',
    gender : 'loading',
    origin : { name : 'loading', url: '' },
    location : { name : 'loading', url: '' },
    image : '',
    episode : [],
    url : '',
    created	: ''
  };

  episodesList : { name : string, episode : string }[] = [];
  fullEpisodesList : { name : string, episode : string }[] = [];
  page : number = 1;
  maxPages : number = 1;
  resultsPerPage : number = 10;

  constructor(private characterService : CharactersService, private modalService : ModalService) { }

  ngOnInit(): void {
    this.modalService.getCharacterId().subscribe(id =>{
      this.characterService.getCharacterDetail(id).subscribe(response =>  {
        this.character = response;
      });
      this.characterService.getCharacterEpisodesName(id).subscribe(response =>  {
        this.fullEpisodesList = response.data.character.episode;
        this.maxPages = Math.floor(this.fullEpisodesList.length / this.resultsPerPage);
        if(this.fullEpisodesList.length % this.resultsPerPage != 0) this.maxPages++;
  
        if(this.page == this.maxPages) {
          this.episodesList = this.fullEpisodesList.slice(0, this.fullEpisodesList.length); // pagina incompleta o pari alla length
        } else {
          this.episodesList = this.fullEpisodesList.slice(0, this.resultsPerPage); // pagina piena
        }

        this.modalService.openModal('detail-modal');
      });
    })
  }

  close() : void {
    this.modalService.closeModal('detail-modal');
  }

  previousPage() : void {
    this.page--;
    this.episodesList = this.fullEpisodesList.slice(this.resultsPerPage * (this.page - 1), this.resultsPerPage * this.page);
  }

  nextPage() : void {
    this.page++;
    if(this.page == this.maxPages) {
      this.episodesList = this.fullEpisodesList.slice(this.resultsPerPage * (this.page - 1), this.fullEpisodesList.length); // pagina incompleta o pari alla length
    } else {
      this.episodesList = this.fullEpisodesList.slice(this.resultsPerPage * (this.page - 1), this.resultsPerPage * this.page); // pagina piena
    }
  }
}