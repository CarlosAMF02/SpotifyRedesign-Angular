import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  backIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;

  actualTrack: ITrack = newTrack();
  subs: Subscription[] = []

  constructor(private playerService: PlayerService, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getPlayingMusic();
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getPlayingMusic() {
    const sub = this.playerService.actualTrack.subscribe(track => this.actualTrack = track);
    this.subs.push(sub);
  }

  async previousTrack() {
    await this.spotifyService.previousTrack();
  }

  async nextTrack() {
    await this.spotifyService.nextTrack();
  }

  async playTrack() {
    this.spotifyService.play();
  }
}
