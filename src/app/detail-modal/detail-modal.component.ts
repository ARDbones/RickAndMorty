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

  constructor(private characterService : CharactersService) { }

  ngOnChanges(changes: SimpleChanges): void { // non cambia se si apre due volte la stessa modale
    this.characterService.getCharacterDetail(changes['charId'].currentValue).subscribe(response =>  {
      this.character = response;
      this.totEpisodes = this.character.episode.length;
    });
    this.characterService.getCharacterEpisodesName(changes['charId'].currentValue).subscribe(response =>  {
      this.episodesList = response.data.character.episode;
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
}

// TODO: la prima istanza dà errore su character null
// onchange cambia tardi e si vedono i precedenti dati