import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaudeService {
  apiUrl = 'http://localhost:3000/api/claude';

  constructor(private http: HttpClient) {}

  checkGrammar(prompt: string, options?: any): Observable<any> {
    return this.http.post(this.apiUrl, { prompt, options }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error.error || 'An error occurred');
      })
    );
  }
}
