import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  topArtists: IArtist[] = []

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.topArtists = await this.spotifyService.getFavoriteArtists(5);
  }

}
