import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnChanges {
  character : any = null;
  @Input() charId = 1;

  constructor(private characterService : CharactersService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.characterService.getCharacterDetail(changes['charId'].currentValue).subscribe(response =>  {
      this.character = response;
    });
  }

  close() : void {
    let modal = document.getElementById('detail-modal');
    modal?.classList.remove('open');
  }
}

// TODO: la prima istanza dà errore su character null
// onchange cambia tardi e si vedono i precedenti dati