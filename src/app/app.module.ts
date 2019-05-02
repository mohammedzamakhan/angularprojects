import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LazyLoadImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
