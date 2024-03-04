import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OpenAiService } from '../../open-ai.service';

@Component({
  selector: 'app-image-gen',
  templateUrl: './image-gen.component.html',
  styleUrl: './image-gen.component.scss',
})
export class ImageGenComponent {
  generatedImage: any;
  isLoading: boolean = false;
  textToGenerate: string = '';
  isDisabledButton: boolean = true;
  errorMessage: string = '';

  constructor(private openAiService: OpenAiService) {}

  ngOnInit(): void {}

  generateImage(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.openAiService.generateImage(this.textToGenerate).subscribe(
      (response: any) => {
        this.generatedImage = response.data[0].url;
        this.isLoading = false;
      },
      (error) => {
        console.log('Error generating image:', error);
        this.errorMessage = error.error.error.message;
        this.isLoading = false;
      }
    );
  }

  inputtedText(event: any) {
    this.textToGenerate = (event.target as HTMLInputElement).value;

    if (this.textToGenerate !== '') this.isDisabledButton = false;
    else this.isDisabledButton = true;
  }
}
