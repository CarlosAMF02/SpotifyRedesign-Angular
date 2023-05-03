import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tracks: ITrack[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getSavedTracks();
  }

  async getSavedTracks() {
    this.tracks = await this.spotifyService.getUserSavedTracks();
  }

  getTrackArtists(track: ITrack) {
    return track.artists.map(a => a.name).join(', ')
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track.id);
    this.playerService.selectActualTrack(track);
  }
}
