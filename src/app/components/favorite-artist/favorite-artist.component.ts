import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-favorite-artist',
  templateUrl: './favorite-artist.component.html',
  styleUrls: ['./favorite-artist.component.scss']
})
export class FavoriteArtistComponent implements OnInit {

  favoriteArtist: IArtist = newArtist();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getArtist()
  }

  async getArtist() {
    const artists = await this.spotifyService.getFavoriteArtists(1);

    if (!!artists) {
      this.favoriteArtist = artists.pop();
    }
  }

}
