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
      confirmButtonColor: '#a05aff',
    });
  }

  showConfirmDeleteAction(user: string){
    return Swal.fire({
      title: `¿Estás seguro de que deseas eliminar ${user}?`,
      text: 'No podrás revertir esta acción',
      icon: "warning",
      iconColor: "#EC9892",
      showCancelButton: true,
      cancelButtonColor: "#b0b0b0",
      confirmButtonColor: "#d93025",
      confirmButtonText: 'Eliminar',
      cancelButtonText: "Cancelar",
      customClass: {
        cancelButton: "alter-btn-cancel",
      },
    });
  }
}
