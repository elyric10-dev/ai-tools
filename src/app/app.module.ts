import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGenComponent } from './components/image-gen/image-gen.component';
import { HttpClientModule } from '@angular/common/http';
import { GrammarCheckerComponent } from './components/grammar-checker/grammar-checker.component';

@NgModule({
  declarations: [AppComponent, ImageGenComponent, GrammarCheckerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
