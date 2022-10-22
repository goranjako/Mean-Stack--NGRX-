import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  success(s: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: s,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  err(text: any) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'Oops...',
      text: text,
    });
  }
  warning(text: any) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'Oops...',
      text: "ERR_CONNECTION_REFUSED",
    });
  }
  logaut() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have been successfully logged out',
    });
  }
}

