import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ClaudeService } from '../../claude.service';
import {
  ToastMessageService,
  ToastMessageType,
} from '../toast-message/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { SentenceModalComponent } from './sentence/sentence-modal/sentence-modal.component';
import { OpenAiService } from '../../open-ai.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grammar-checker',
  templateUrl: './grammar-checker.component.html',
  styleUrl: './grammar-checker.component.scss',
})
export class GrammarCheckerComponent implements OnInit {
  public innerWidth: any;
  private checkerSubject = new Subject<string>();
  currentPath: string = '';
  checkedResponse: any = '';
  textToCheck: string = '';
  isLoading: boolean = false;
  currentTitle: string = 'GRAMMAR CHECKER';

  errorMessage: string = '';
  showMobileResult: boolean = false;
  currentScreenSize: number = 0;

  returned: any = [];
  isOpenOptions: boolean = false;
  isMobileScreen: boolean = false;

  isSelectedGrammar: boolean = true;

  constructor(
    private openAiService: OpenAiService,
    private claudeService: ClaudeService,
    private toastService: ToastMessageService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {
    this.checkerSubject
      .pipe(debounceTime(1000))
      .subscribe(() => this.checkGrammar(this.textToCheck));

    this.currentPath = this.route.snapshot.url.join('/');
    this.isSelectedGrammar = this.currentPath === 'paraphrase' ? false : true;
    this.currentTitle = this.isSelectedGrammar
      ? 'Grammar Checker'.toLocaleUpperCase()
      : 'Paraphrase'.toLocaleUpperCase();
  }

  ngOnInit(): void {
    this.getWindowWidth();
  }

  getWindowWidth() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;

      if (this.innerWidth <= 768) this.isMobileScreen = true;
      else this.isMobileScreen = false;
    } else console.log('Window object is not available on the server');
  }

  hideShowMobileResult() {
    this.showMobileResult = !this.showMobileResult;
  }

  inputtedText(event: Event) {
    this.textToCheck = (event.target as HTMLInputElement).value;
  }

  checkGrammar(prompt: string) {
    this.returned = [];
    this.showMobileResult = this.isMobileScreen
      ? !this.showMobileResult
      : false;
    this.isLoading = true;
    this.openAiService.checkGrammar(prompt).subscribe(
      (response: any) => {
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

  correctWrongWord(rowWord: any, itemId: any, event: any) {
    event.stopPropagation();
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
    if (width < 768) this.isMobileScreen = true;
    else this.isMobileScreen = false;
  }

  openOptions() {
    this.isOpenOptions = !this.isOpenOptions;
  }

  selectOption() {
    this.isSelectedGrammar = !this.isSelectedGrammar;
    this.currentTitle = this.isSelectedGrammar
      ? 'Grammar Checker'.toLocaleUpperCase()
      : 'Paraphrase'.toLocaleUpperCase();
    this.updateUrl();

    this.isOpenOptions = false;
  }

  updateUrl() {
    const baseUrl = `${window.location.origin}`;
    const newUrl = this.isSelectedGrammar
      ? `${baseUrl}/grammar-checker`
      : `${baseUrl}/paraphrase`;
    window.history.replaceState(null, '', newUrl);
  }

  showFixed(row: any) {
    const data = {
      title: this.isSelectedGrammar ? 'GRAMMAR' : 'REPHRASE',
      sentence: this.isSelectedGrammar ? row.correct_grammar : row.rephrase,
    };
    this.dialog
      .open(SentenceModalComponent, {
        data,
        panelClass: 'panelClass',
        width: '380px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.returned.map((item: any) => {
            if (item.id === row.id) {
              item.words = [];
              item.words[0] = {
                id: 1,
                original: result,
              };
            }
          });
        }
      });
  }
}
