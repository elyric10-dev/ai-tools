import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { OpenAiService } from '../../open-ai.service';

@Component({
  selector: 'app-grammar-checker',
  templateUrl: './grammar-checker.component.html',
  styleUrl: './grammar-checker.component.scss',
})
export class GrammarCheckerComponent {
  private checkerSubject = new Subject<string>();
  checkedResponse: any = '';
  textToCheck: string = '';
  isLoading: boolean = false;

  originalSentence: any[] = [];
  correctGrammar: any[] = [];
  rephraseSentence: any[] = [];

  wrongSpellingWords: any[] = [];

  verbTensesWords: any[] = [];
  singularPlurals: any[] = [];

  constructor(private openAiService: OpenAiService) {
    this.checkerSubject
      .pipe(debounceTime(1000))
      .subscribe(() => this.checkGrammar(this.textToCheck));

    // this.hasWrongSpellingWord(0);

    this.extractData();

    // console.log(this.originalSentence[0]);
    const word = 'hotl';
    console.log(this.originalSentence[1].includes(word));

    // console.log(this.originalSentence[1].includes('droped'));
    // console.log(this.originalSentence[1].includes('lugage'));
    // console.log(this.originalSentence[2]);
    // console.log(this.originalSentence[3]);
    // console.log(this.originalSentence[4]);
    // this.replaceWrongWords(this.originalSentence, this.wrongSpellingWords);
  }

  // replaceWrongWords(sentences: string[], corrections: any[]) {
  //   sentences.forEach((sentence, index) => {
  //     corrections.forEach((correction) => {
  //       if (correction.what_sentence_array_number_belong === index) {
  //         correction.wrong_spelling_word.forEach(
  //           (wrongWord: any, i: number) => {
  //             const regex = new RegExp(`\\b${wrongWord}\\b`, 'gi');
  //             sentences[index] = sentences[index].replace(
  //               regex,
  //               correction.corrected[i]
  //             );
  //           }
  //         );
  //       }
  //     });
  //   });
  //   console.log(sentences);
  //   return sentences;
  // }

  extractData() {
    this.originalSentence =
      this.returned.breakdown_user_input_sentences.user_input_breakdown;
    this.correctGrammar =
      this.returned.breakdown_user_input_sentences.correct_grammar;
    this.rephraseSentence =
      this.returned.breakdown_user_input_sentences.rephrase_sentence;

    this.wrongSpellingWords =
      this.returned.wrong_spelling_words_each_sentence.wrong_spelling_words;

    this.verbTensesWords =
      this.returned.verb_tenses_words.user_input_wrong_verb_tenses;

    this.singularPlurals =
      this.returned.singular_plurals.user_input_wrong_singular_plurals;

    console.log(this.originalSentence);
    console.log(this.correctGrammar);
  }

  inputtedText(event: Event) {
    this.textToCheck = (
      event.target as HTMLInputElement
    ).value.toLocaleLowerCase();

    if (this.textToCheck !== '') this.checkerSubject.next(this.textToCheck);
    else this.textToCheck = '';
  }

  onPasteText(event: ClipboardEvent) {
    this.textToCheck = '';
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.textToCheck = pastedText;

    this.checkerSubject.next(this.textToCheck);
  }

  checkGrammar(prompt: string) {
    this.openAiService.checkGrammar(prompt).subscribe(
      (response: any) => {
        console.log('response', response);

        this.checkedResponse = response.choices[0].message.content;
        const responseToJson: any = JSON.parse(this.checkedResponse);

        console.log(responseToJson);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  // findWrongSpellingInSentence(index: any) {
  //   this.returned.wrong_spelling_words_each_sentence.wrong_spelling_words.forEach(
  //     (item: any) => {
  //       this.wrongSpellingWords.push(item);
  //     }
  //   );
  // }

  // hasWrongSpellingWord(index: number) {
  //   this.returned.breakdown_user_input_sentences.user_input_breakdown.forEach(
  //     (item: any) => {
  //       this.originalSentence.push(item);
  //     }
  //   );
  // }

  // hasWrongVerbTenses(index: number): boolean {
  //   return this.returned.verb_tenses_words.user_input_wrong_verb_tenses.some(
  //     (entry: { what_sentence_array_number_belong: number }) =>
  //       entry.what_sentence_array_number_belong === index
  //   );
  // }

  // Find sentence in array with belong number: 1
  // Focus to that array and search wrong spelling words:  ['hotl', 'droped', 'lugage']

  // getWrongVerbTensesWords(index: number, sentence: string): string[] {
  //   const entry =
  //     this.returned.verb_tenses_words.user_input_wrong_verb_tenses.find(
  //       (entry: { what_sentence_array_number_belong: number }) =>
  //         entry.what_sentence_array_number_belong === index
  //     );

  //   return entry ? entry.verb_tense_word : [];
  // }

  returned: any = {
    wrong_spelling_words_each_sentence: {
      wrong_spelling_words: [
        {
          what_sentence_array_number_belong: 1,
          wrong_spelling_word: ['hotl', 'droped', 'lugage'],
          corrected: ['hotel', 'dropped', 'luggage'],
        },
        {
          what_sentence_array_number_belong: 4,
          wrong_spelling_word: ['maried'],
          corrected: ['married'],
        },
      ],
      isCorrect: false,
    },
    breakdown_user_input_sentences: {
      user_input_breakdown: [
        'I will ate fish for dinner and drank milk',
        'When the girl on the team got to the hotl, they droped off her lugage',
        'We all eat the fish and then made dessert',
        'We enjoys horror movies',
        'Anna and Pat are maried; he have been together for 20 years',
      ],
      correct_grammar: [
        'I will eat fish for dinner and drink milk.',
        'When the girl on the team got to the hotel, they dropped off her luggage.',
        'We all ate the fish and then made dessert.',
        'We enjoy horror movies.',
        'Anna and Pat are married; they have been together for 20 years.',
      ],
      rephrase_sentence: [
        'I will eat fish for dinner and drink milk.',
        'When the girl on the team arrived at the hotel, they unloaded her luggage.',
        'We all ate the fish and then prepared dessert.',
        'We enjoy horror movies.',
        'Anna and Pat are married; they have been together for 20 years.',
      ],
    },
    verb_tenses_words: {
      user_input_wrong_verb_tenses: [
        {
          what_sentence_array_number_belong: 0,
          verb_tense_word: ['ate', 'drank'],
          corrected: ['eat', 'drink'],
        },
        {
          what_sentence_array_number_belong: 2,
          verb_tense_word: ['eat'],
          corrected: ['ate'],
        },
        {
          what_sentence_array_number_belong: 3,
          verb_tense_word: ['enjoys'],
          corrected: ['enjoy'],
        },
      ],
    },
    singular_plurals: {
      user_input_wrong_singular_plurals: [
        {
          what_sentence_array_number_belong: 4,
          singular_plural: ['he'],
          corrected: ['they'],
        },
      ],
    },
  };
}
