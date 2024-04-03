import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HuggingfaceService {
  private textGenerationModelApiUrl =
    'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-hf';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
  }

  textGeneration(data: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(
      this.textGenerationModelApiUrl,
      JSON.stringify(data),
      { headers }
    );
  }
}
