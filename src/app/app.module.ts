import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGenComponent } from './components/image-gen/image-gen.component';
import { HttpClientModule } from '@angular/common/http';
import { GrammarCheckerComponent } from './components/grammar-checker/grammar-checker.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SentenceModalComponent } from './components/grammar-checker/sentence/sentence-modal/sentence-modal.component';
import { ShimmerSkeletonComponent } from './components/shimmer-skeleton/shimmer-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGenComponent,
    GrammarCheckerComponent,
    ToastMessageComponent,
    SentenceModalComponent,
    ShimmerSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinner,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
