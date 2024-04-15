import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  [key: string]: any;
  constructor() {}

  public OPENAI_API_KEY = 'Demo Service';
}
