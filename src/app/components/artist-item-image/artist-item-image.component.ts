import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artist-item-image',
  templateUrl: './artist-item-image.component.html',
  styleUrls: ['./artist-item-image.component.scss']
})
export class ArtistItemImageComponent {

  @Input()
  imageSrc = '';

  @Input()
  artistName = '';

  @Output()
  click = new EventEmitter<void>();
  
  onClick() {
    this.click.emit();
  }


}
