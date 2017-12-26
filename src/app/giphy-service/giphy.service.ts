import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GiphyService {
  private giphyKey = 'dc6zaTOxFJmzC';
  private limit = 20;
  private oldRequest: string;
  private offset = 0;

  constructor(private http: HttpClient) { }

  getGifs(request) {
    if (this.oldRequest !== request) {
      this.offset = 0;
    }
    this.oldRequest = request;
    const url = 'https://api.giphy.com/v1/gifs/search?q=' + this.oldRequest + '&api_key='
      + this.giphyKey + '&limit=' + this.limit + '&offset=' + this.offset;
    return this.http.get(url)
                    .toPromise();
  }

  getMoreGifs() {
    this.offset += 20;
    return this.getGifs(this.oldRequest);
  }

}
