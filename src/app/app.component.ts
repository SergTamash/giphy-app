import { Component } from '@angular/core';
import { GiphyService } from './giphy-service/giphy.service';
import { MatDialog } from '@angular/material';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gifs: Array<any> = [];
  nothingFound = false;
  itsAll = false;
  timeId = null;

  constructor(private giphyService: GiphyService, public dialog: MatDialog) {}

  searchGifs(request) {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout( () => {
      this.getGifs(request);
    }, 500);
  }
  getGifs(request) {
    this.giphyService.getGifs(request).then((resp: {data}) => {
      this.gifs = resp.data;
      this.nothingFound = resp.data.length ? false : true;
      this.itsAll = false;
    });
  }

  getMoreGifs() {
    this.giphyService.getMoreGifs().then((resp: {data}) => {
      this.gifs = this.gifs.concat(resp.data);
      this.itsAll = resp.data.length ? false : true;
    });
  }

  openDialog(gif) {
    this.dialog.open(GiphyDialogComponent, {
      data: gif
    });
  }

}
