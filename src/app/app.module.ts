import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { GiphyService } from './giphy-service/giphy.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GiphyDialogComponent
  ],
  entryComponents: [
    GiphyDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomMaterialModule,
    InfiniteScrollModule,
    AlertModule.forRoot()
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
