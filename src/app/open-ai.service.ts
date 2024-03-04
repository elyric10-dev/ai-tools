import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private imageApiUrl = 'https://api.openai.com/v1/images/generations';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
  }

  generateImage(prompt: string): Observable<any> {
    const headers = this.getHeaders();

    const payload = {
      prompt: `Generate an image of ${prompt}`,
    };

    return this.http.post<any>(this.imageApiUrl, payload, { headers });
  }
}
