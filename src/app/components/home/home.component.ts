import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ITrack } from 'src/app/interfaces/ITrack';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playIcon = faPlay;

  tracks: ITrack[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getSavedTracks();
  }

  async getSavedTracks() {
    this.tracks = await this.spotifyService.getUserSavedTracks();
    console.log(this.tracks);
  }

  getTrackArtists(track: ITrack) {
    return track.artists.map(a => a.name).join(', ')
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track.id);
  }
}
