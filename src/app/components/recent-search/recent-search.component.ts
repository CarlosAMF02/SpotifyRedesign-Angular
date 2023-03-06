import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent {
  recentSearch = [ 'Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira' ];

  searchField = '' 

  searchOption(searchText: string) {
    this.searchField = searchText;

    this.searchAction();
  }

  searchAction() {
    if( this.searchField) {
      if (!this.recentSearch.includes(this.searchField)) {
        for (let i = --this.recentSearch.length; i >= 0; i--) {
          if (i == 0) {
            this.recentSearch[i] = this.searchField;
            continue;
          }
          this.recentSearch[i] = this.recentSearch[i-1];
        }
      }
    }
  }
}
