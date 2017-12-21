import {Component, OnInit} from '@angular/core';
import {GiphyService} from './giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Giphy-app';
  gifs: any[];

  constructor(private giphyService: GiphyService) {}

  ngOnInit() {

  }

  getGifs(request) {
    this.giphyService.getGifs(request).then((resp: {data}) => {
      this.gifs = resp.data;
      console.log(this.gifs);
    });
  }

  getMoreGifs() {
    this.giphyService.getMoreGifs().then((resp: {data}) => {
      this.gifs = resp.data;
    });
  }

}
