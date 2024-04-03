import { Component } from '@angular/core';
import { CivitaiService } from './civitai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Elyric AI';
  // images: any = []

  // constructor(private civitaiService: CivitaiService){
  //   this.loadImages();
  // }

  // loadImages(){
  //   this.civitaiService.getImageList({nsfw: false, nsfwLevel: "X"}).subscribe((result)=>{
  //     console.log(result.items)
  //     this.images = result.items
  //   })
  // }
}
