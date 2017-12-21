import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GiphyService {
  private giphyKey = 'dc6zaTOxFJmzC';
  private limit = 20;
  private oldRequest: string;

  constructor(private http: HttpClient) { }

  getGifs(request) {


    this.oldRequest = request;
    const url = 'http://api.giphy.com/v1/gifs/search?q=' + this.oldRequest + '&api_key=' + this.giphyKey + '&limit=' + this.limit;
    return this.http.get(url)
                    .toPromise();
  }

  getMoreGifs() {
    this.limit += 20;
    return this.getGifs(this.oldRequest);
  }

}
