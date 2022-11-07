import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { Contact } from './contact';
import { ContactsActions } from './store/actions';
import { selectContacts } from './store/selector';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  gridColumns = 4;

  constructor(
    private store: Store,
    private router: Router,
    private token: AuthService,
    private loading: NgxSpinnerService
  ) {
    this.store.dispatch(ContactsActions.loadRequestAction());
  }
  contacts: any;
  user: any;
  userId: any;
  ngOnInit(): void {
    this.contacts = this.store.pipe(select(selectContacts));
  }
  trackByMethod(index: number, data: Contact) {
    return data._id;
  }
  add(){
    this.router.navigate(["contacts/add"]);
  }
  edit(contact: any) {
    this.router.navigate(['contacts/edit', contact]);
  }

  delete(id: any) {
    this.swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(
            ContactsActions.deleteRequestAction({
              id: id,
            })
          );
          this.swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your contact has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your contact is safe ',
            'error'
          );
        }
      });
  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
