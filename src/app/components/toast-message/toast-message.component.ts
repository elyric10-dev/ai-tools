import { Component, OnInit } from '@angular/core';
import { ToastMessageService, ToastMessageType } from './toast-message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss',
})
export class ToastMessageComponent implements OnInit {
  toastMessage: string = '';
  toastMessageType: any = '';
  toastDatas: any = [];

  constructor(private toastService: ToastMessageService) {
    this.toastService.getToastMessage().subscribe(({ message, type }) => {
      const newData = {
        id: this.toastDatas.length + 1,
        message: message,
        type: type,
        show: false,
      };

      this.toastDatas.push(newData);

      this.toastDatas.find((item: any) => {
        if (item.id === newData.id) item.show = true;
      });
    });
  }

  closeToast(row: any) {
    row.show = false;
    setTimeout(() => {
      this.toastDatas = this.toastDatas.filter(
        (item: any) => item.id !== row.id
      );
    }, 500);
  }
  ngOnInit(): void {}
}
