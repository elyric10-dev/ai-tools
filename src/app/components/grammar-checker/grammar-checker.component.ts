import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ClaudeService } from '../../claude.service';
import {
  ToastMessageService,
  ToastMessageType,
} from '../toast-message/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { SentenceModalComponent } from './sentence/sentence-modal/sentence-modal.component';
import { OpenAiService } from '../../open-ai.service';

@Component({
  selector: 'app-grammar-checker',
  templateUrl: './grammar-checker.component.html',
  styleUrl: './grammar-checker.component.scss',
})
export class GrammarCheckerComponent implements OnInit {
  private checkerSubject = new Subject<string>();
  checkedResponse: any = '';
  textToCheck: string = '';
  isLoading: boolean = false;
  currentTitle: string = 'GRAMMAR CHECKER';

  errorMessage: string = '';
  showMobileResult: boolean = false;
  showDesktopResult: boolean = false;
  currentScreenSize: number = 0;

  returned: any = [];
  isOpenOptions: boolean = false;

  constructor(
    private openAiService: OpenAiService,
    private claudeService: ClaudeService,
    private toastService: ToastMessageService,
    private dialog: MatDialog
  ) {
    this.checkerSubject
      .pipe(debounceTime(1000))
      .subscribe(() => this.checkGrammar(this.textToCheck));
  }

  isButton1Clicked = false;
  isButton2Clicked = false;
  isShowOptions = false;
  selectedOption: string = 'Grammar Checker';
  notSelectedOption: string = 'Paraphrase';
  isSelectedGrammar: boolean = true;

  onClick() {
    console.log('clicked!');
    this.isButton1Clicked = true;
    this.isButton2Clicked = true;
    // this.isShowOptions = !this.isShowOptions;

    this.dialog.open(SentenceModalComponent, { panelClass: 'panelClass' });
  }

  resetFlags() {
    this.isButton1Clicked = false;
    this.isButton2Clicked = false;
  }

  ngOnInit(): void {}

  hideShowMobileResult() {
    this.showMobileResult = !this.showMobileResult;
    console.log('clicked!', this.showMobileResult);
  }

  inputtedText(event: Event) {
    this.textToCheck = (event.target as HTMLInputElement).value;
  }

  checkGrammar(prompt: string) {
    this.returned = [];
    this.showMobileResult = !this.showMobileResult;
    this.isLoading = true;
    this.openAiService.checkGrammar(prompt).subscribe(
      (response: any) => {
        console.log(response);

        // FOR OPENAI CHATGPT API
        if (response.choices[0].finish_reason === 'length') {
          this.toastService.setToastMessage(
            'Max Tokens, please adjust and reduce your input.',
            ToastMessageType.Error
          );

          this.isLoading = false;
        }

        let JsonResponse = JSON.parse(response.choices[0].message.content);
        this.returned = JsonResponse.sentences;

        if (this.returned) {
          this.toastService.setToastMessage(
            'Sentence Successfully Loaded!',
            ToastMessageType.Success
          );
        }

        this.isLoading = false;
        console.log('isLoading', this.isLoading);
        console.log('showMobileResult', this.showMobileResult);

        // FOR CLAUDE API
        // if (response.stop_reason === 'max_tokens') {
        //   this.errorMessage = 'Max Tokens please adjust and lessen you input.';
        // } else {
        //   this.checkedResponse = response.content[0].text;
        //   const responseToJson: any = JSON.parse(this.checkedResponse);

        //   this.returned = responseToJson;
        //   console.log(responseToJson);
        //   this.errorMessage = '';
        // }
      },
      (error) => {
        console.log('Error', error);

        if (error.name === 'HttpErrorResponse') {
          this.toastService.setToastMessage(
            'Please check your connection and try again!',
            ToastMessageType.Error
          );
          this.isLoading = false;
        }
      }
    );
  }

  correctWrongWord(rowWord: any, itemId: any) {
    this.returned.map((item: any) => {
      item.words.map((word: any) => {
        if (item.id === itemId && word.id === rowWord.id) {
          word.original = word.corrected;
          word.corrected = '';
          word.problem_label = '';
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.currentScreenSize = event.target.innerWidth;
    this.updateShowMobileResult(event.target.innerWidth);
  }

  updateShowMobileResult(width: number) {
    if (width < 768) {
      this.showMobileResult = true;
    } else if (width > 768) {
      this.showDesktopResult = true;
    } else {
      this.showMobileResult = false;
      this.showDesktopResult = false;
    }

    console.log('isLoading', this.isLoading);
    console.log('showMobileResult', this.showMobileResult);
  }

  openOptions() {
    this.isOpenOptions = !this.isOpenOptions;
  }

  selectOption() {
    this.isSelectedGrammar = !this.isSelectedGrammar;
    this.currentTitle = this.isSelectedGrammar
      ? 'Grammar Checker'.toLocaleUpperCase()
      : 'Paraphrase'.toLocaleUpperCase();

    this.isOpenOptions = false;
  }
}
