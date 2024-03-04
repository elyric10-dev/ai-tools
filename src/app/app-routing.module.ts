import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGenComponent } from './components/image-gen/image-gen.component';

const routes: Routes = [{ path: 'image-gen', component: ImageGenComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
