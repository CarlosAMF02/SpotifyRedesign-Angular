import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-item-image',
  templateUrl: './artist-item-image.component.html',
  styleUrls: ['./artist-item-image.component.scss']
})
export class ArtistItemImageComponent {

  @Input()
  artistId = '';

  @Input()
  imageSrc = '';

  @Input()
  artistName = '';

  @Output()
  click = new EventEmitter<void>();

  constructor(private router: Router) {}
  
  onClick() {
    this.router.navigateByUrl('/player/list/artist/' + this.artistId);
  }


}
