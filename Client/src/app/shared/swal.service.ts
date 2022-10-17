import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  top(s: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: s,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  show(text: any) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'Oops...',
      text: text,
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
