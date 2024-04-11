import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CivitaiService {
  // private textGenerationModelApiUrl =
  //   'https://civitai.com/api/v1/creators?limit=3';

  private imagesApiUrl = 'https://civitai.com/api/v1/images';
  private CIVITAI_API_KEY = process.env['CIVITAI_API_KEY'];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.CIVITAI_API_KEY}`,
    });
  }

  // textGeneration(data: any): Observable<any> {
  //   const headers = this.getHeaders();

  //   return this.http.post<any>(
  //     this.textGenerationModelApiUrl,
  //     JSON.stringify(data),
  //     { headers }
  //   );
  // }

  getImageList(params: any): Observable<any> {
    const headers = this.getHeaders();

    // Construct query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      queryParams = queryParams.set(key, params[key]);
    });

    return this.http.get<any>(this.imagesApiUrl, {
      headers,
      params: queryParams,
    });
  }
}
