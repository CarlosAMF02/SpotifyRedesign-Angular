import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  playIcon = faPlay;

  tracks: ITrack[] = [];
  actualTrack: ITrack = newTrack();

  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getActualTrack();
    this.getSavedTracks();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getSavedTracks() {
    this.tracks = await this.spotifyService.getUserSavedTracks();
  }

  getActualTrack() {
    const sub = this.playerService.actualTrack.subscribe(track => this.actualTrack = track )
    this.subs.push(sub);
  }

  getTrackArtists(track: ITrack) {
    return track.artists.map(a => a.name).join(', ')
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track.id);
    this.playerService.selectActualTrack(track);
  }
}
