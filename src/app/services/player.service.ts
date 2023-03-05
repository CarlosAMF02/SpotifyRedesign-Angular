import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newTrack } from '../Common/factories';
import { ITrack } from '../interfaces/ITrack';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  actualTrack = new BehaviorSubject<ITrack>(newTrack());
  trackTimer: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getActualTrack();
   }

  async getActualTrack() {
    clearTimeout(this.trackTimer);

    const track = await this.spotifyService.getActualTrack();
    this.selectActualTrack(track);

    this.trackTimer = setInterval( async () => { await this.getActualTrack() } , 5000)
  }

  selectActualTrack(track: ITrack) {
    this.actualTrack.next(track);
  }
}
