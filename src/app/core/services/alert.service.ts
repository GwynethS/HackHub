import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private notification$ = new Subject<SweetAlertOptions>();

  constructor(){
    this.notification$.subscribe({
      next: (options) => {
        Swal.fire(options);
      }
    });
  }

  showAlert(options: SweetAlertOptions): void{
    this.notification$.next(options);
  }

  showSuccess(title: string, message: string): void{
    this.notification$.next({
      icon: 'success',
      title,
      text: message
    });
  }

  showError(title: string, message?: string): void{
    this.notification$.next({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#8e48ff',
    });
  }
}
