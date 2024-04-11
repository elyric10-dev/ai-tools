import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGenComponent } from './components/image-gen/image-gen.component';
import { GrammarCheckerComponent } from './components/grammar-checker/grammar-checker.component';

const routes: Routes = [
  { path: 'image-gen', component: ImageGenComponent },
  { path: 'grammar-checker', component: GrammarCheckerComponent },
  { path: 'paraphrase', component: GrammarCheckerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
