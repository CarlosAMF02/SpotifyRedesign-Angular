import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-list-table',
  templateUrl: './music-list-table.component.html',
  styleUrls: ['./music-list-table.component.scss']
})
export class MusicListTableComponent implements OnInit, OnDestroy {

  @Input()
  tracksList: ITrack[] = [];

  playIcon = faPlay;
  actualTrack: ITrack = newTrack();

  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, 
    private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe()); 
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

    if (track.album.imageUrl) this.playerService.selectActualTrack(track);
  }



}
