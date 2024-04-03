import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum ToastMessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  private toastMessage = new Subject<{
    message: string;
    type: ToastMessageType;
  }>();
  private slideBack = new Subject<boolean>();

  constructor() {}

  setToastMessage(message: string, type: ToastMessageType) {
    this.toastMessage.next({ message, type });
  }

  getToastMessage(): Observable<{ message: string; type: ToastMessageType }> {
    return this.toastMessage.asObservable();
  }

  setSlideBack(isSlideBack: boolean) {
    this.slideBack.next(isSlideBack);
  }

  getSlideBack(): Observable<boolean> {
    return this.slideBack.asObservable();
  }
}
