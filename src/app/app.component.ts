import { Component, OnInit } from '@angular/core';
import { GiphyService } from './giphy-service/giphy.service';
import { MatDialog } from '@angular/material';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';
import { Gif, Gifs } from './gif';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gifs = [];
  nothingFound = false;
  itsAll = false;
  timeId = null;
  term = '';
  offset = 0;

  gifs$: Observable<Gifs>;
  private searchGifsO = new Subject<string>();

  constructor(private giphyService: GiphyService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchGifsO
      .debounceTime(300)
      .flatMap((term: string, offset: number = 0) => this.giphyService.searchGifs(term, this.offset))
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.gifs$ = resp.data;
        }
      });
  }

  search2(term: string): void {
    this.term = term;
    this.offset = 0;
    this.searchGifsO.next(term);
  }

  searchGifs(request) {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout( () => {
      this.getGifs(request);
    }, 500);
  }
  getGifs(request) {
    this.giphyService.getGifs(request).then((resp: Gifs) => {
      this.gifs = resp.data;
      this.nothingFound = resp.data.length ? false : true;
      this.itsAll = false;
    });
  }

  getMoreGifs() {
    // this.giphyService.getMoreGifs().then((resp: {data}) => {
    //   this.gifs = this.gifs.concat(resp.data);
    //   this.itsAll = resp.data.length ? false : true;
    // });
    this.offset += 40;
    this.searchGifsO.next(this.term);
  }

  openDialog(gif) {
    this.dialog.open(GiphyDialogComponent, {
      data: gif
    });
  }

}
