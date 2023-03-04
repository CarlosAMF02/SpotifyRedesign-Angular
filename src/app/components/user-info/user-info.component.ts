import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  exitIcon = faSignOutAlt;
  user: IUser = null;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }

}
