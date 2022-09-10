import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnChanges {
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

  totEpisodes : number = 0;
  episodesList : { name : string, episode : string }[] = [];
  fullEpisodesList : { name : string, episode : string }[] = [];
  page : number = 1;
  maxPages : number = 1;
  resultsPerPage : number = 10;

  constructor(private characterService : CharactersService) { }

  ngOnChanges(changes: SimpleChanges): void { // non cambia se si apre due volte la stessa modale
    this.characterService.getCharacterDetail(changes['charId'].currentValue).subscribe(response =>  {
      this.character = response;
      this.totEpisodes = this.character.episode.length;
    });
    this.characterService.getCharacterEpisodesName(changes['charId'].currentValue).subscribe(response =>  {
      this.fullEpisodesList = response.data.character.episode;
      this.maxPages = Math.floor(this.fullEpisodesList.length / this.resultsPerPage);
      if(this.fullEpisodesList.length % this.resultsPerPage != 0) this.maxPages++;

      if(this.page == this.maxPages) {
        this.episodesList = this.fullEpisodesList.slice(0, this.fullEpisodesList.length); // pagina incompleta o pari alla length
      } else {
        this.episodesList = this.fullEpisodesList.slice(0, this.resultsPerPage); // pagina piena
      }
    });
  }

  close() : void {
    let modal = document.getElementById('detail-modal');
    modal?.classList.remove('open');
    this.character = { // crea problemi nell'onchange
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

// TODO: la prima istanza dà errore su character null
// onchange cambia tardi e si vedono i precedenti dati