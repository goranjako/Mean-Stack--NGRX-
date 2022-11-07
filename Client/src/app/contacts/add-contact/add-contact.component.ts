import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { ContactService } from '../contact.service';
import { ContactsActions } from '../store/actions';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

user:any;
userId:any;
  errorMessage$: any;
  constructor(
    private router: Router,
    private store: Store,
    private servis:ContactService,
    private toke: AuthService,
    private loading: NgxSpinnerService
  ) {}
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  ngOnInit() {
  this.getuser();
  }

  registerForm = new FormGroup({
    firstName: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    lastName: new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$')
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(25),
      ])
    ),
    address: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    phone: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      )
    ),
  });
  //geters
  get firstName() {
    return this.registerForm.get('firstName')
  }
  get lastName() {
    return this.registerForm.get('lastName')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get address() {
    return this.registerForm.get('address')
  }
  get phone() {
    return this.registerForm.get('phone')
  }

  //submit
  onSubmit(f: any): void {

    const data={
    "firstName":f.firstName,
    "lastName":f.lastName,
    "email":f.email,
    "address":f.address,
    "phone":f.phone,
    "userId":this.userId
    }
    this.loading.show();
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(ContactsActions.saveRequestAction({ newcontact: data }));
        Swal.fire('Saved!', '', 'success')
        this.loading.hide();
        this.router.navigate(["/contacts"])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        this.router.navigate(["/contacts"])
      }
    })


}
getuser(){
   this.user =this.toke.getToken();
  return this.userId= this.user._id;
}

}
