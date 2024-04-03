import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  textApiUrl = 'https://api.openai.com/v1/chat/completions';
  imageApiUrl = 'https://api.openai.com/v1/images/generations';
  apiKey = environment.openAiApiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
  }

  checkGrammar(prompt: string): Observable<any> {
    const headers = this.getHeaders();

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Be an English grammar checker and DETECT SENTENCE ENDING DEPENDING ON SITUATION AND apply period to the end of the sentences. Apply logical thinking as well: 
          You need to correct the errors and provide an Unescaped JSON JSON structure for the corrected sentence:
          example sentence: "Max Tokens please adjust and lessen you input Me and my friend went to the store" // no period on input and store so to correct it: 'input.' and 'store.'

          ADD PERIOD OR '.' TO THE LAST WORD OF THE SENTENCE in "words" array and put "problem_label"
          "sentences": [
            {
                "id": 1,
                "isOpen": false,
                "words": [
                    {"id": 1, "original": "Max"},
                    {"id": 2, "original": "Tokens", "corrected": "Tokens,", "problem_label": "punctuation"},
                    {"id": 3, "original": "please", "corrected": "Please", "problem_label": "capitalization"},
                    {"id": 4, "original": "adjust"},
                    {"id": 5, "original": "and"},
                    {"id": 6, "original": "lessen"},
                    {"id": 7, "original": "you", "corrected": "your", "problem_label": "pronoun agreement"},
                    {"id": 8, "original": "input", "corrected": "input.", "problem_label": "punctuation"} // 'input' word doesn't have '.' at the end of the word so, to correct it just put word together with period = 'input.'
                ],
                "correct_grammar": "Max Tokens. Please adjust and lessen your input.",
                "rephrase": "Max Tokens. Kindly adjust and reduce your input."
            },
            {
              ...
              
              "words": [
                {"id": 1, "original": "Me and my friend", "corrected": "My friend and I", "problem_label": "problem_label"}, //Count as one word
                {"id": 2, "original": "went", "corrected": "Tokens,", "problem_label": "punctuation"},
                {"id": 3, "original": "the", "corrected": "Please", "problem_label": "capitalization"},
                {"id": 4, "original": "store", "corrected": "store.", "problem_label": "punctuation"} //ADD PERIOD TO THE END
            ],
            }
        ]
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      response_format: { type: 'json_object' },
    };

    return this.http.post<any>(this.textApiUrl, payload, { headers });
  }

  generateImage(prompt: string): Observable<any> {
    const headers = this.getHeaders();

    const payload = {
      prompt: `Generate an image of ${prompt}`,
    };

    return this.http.post<any>(this.imageApiUrl, payload, { headers });
  }
}
