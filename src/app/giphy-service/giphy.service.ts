import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Gif, Gifs } from '../gif';

@Injectable()
export class GiphyService {
  private giphyKey = 'dc6zaTOxFJmzC';
  private limit = 40;
  private oldRequest: string;
  private offset = 0;

  constructor(private http: HttpClient) { }

  getGifs(request) {
    if (this.oldRequest !== request) {
      this.offset = 0;
    }
    this.oldRequest = request;
    if (!request) {
      this.oldRequest = '';
    }
    const url = 'https://api.giphy.com/v1/gifs/search?q=' + this.oldRequest + '&api_key='
      + this.giphyKey + '&limit=' + this.limit + '&offset=' + this.offset;
    return this.http.get(url)
                    .toPromise();
  }

  getMoreGifs() {
    this.offset += 40;
    return this.getGifs(this.oldRequest);
  }

  searchGifs(term: string, offset: number = 0): Observable<Gifs> {
    const url = 'https://api.giphy.com/v1/gifs/search?q=' + term + '&api_key='
      + this.giphyKey + '&limit=' + this.limit + '&offset=' + offset;
    // if (!term.trim()) {
    //   console.log(term);
    //   return of([]);
    // }
    return this.http.get<Gifs>( url )
      .pipe(
      tap(_ => console.log(`found gifs`)),
      catchError( (err) => {
        console.log(err);
        return [];
      })
    );
  }

}
