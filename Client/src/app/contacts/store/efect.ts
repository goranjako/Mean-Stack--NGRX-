
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf,withLatestFrom, mergeMap, switchMap, } from 'rxjs';
import { catchError, map, startWith, } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactsActions} from './actions';
import { Store } from '@ngrx/store';


@Injectable()
export class  ContactsEffect {
  constructor(private dataService: ContactService,  private actions$: Actions, private store: Store,) {}

  loadCustomersRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.loadContactsRequestAction),
      switchMap(action => {
        const subject = "Contact";
        return this.dataService.getContact(action.id).pipe(
          map((contact: any) => {
              return ContactsActions.loadContactsSuccessAction({ contact })
          }),
          catchError((error: any) => {
            return observableOf(ContactsActions.loadContactsFailureAction({ error }))
          })
        )
      })
  ))


  loadRequestEffect$
  = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.loadRequestAction),
      mergeMap(() => this.dataService.getContacts().pipe(
          map((contact:Contact[]) => {
              return ContactsActions.loadSuccessAction({ contact })
          }),
          catchError(error => {
            return observableOf(ContactsActions.saveFailureAction({ error }))
          })
        )
      )
  )
  );



  saveRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.saveRequestAction),
      switchMap((action) => {
        return this.dataService.postContact(action.newcontact).pipe(
          map((newcontact: Contact) => {
              return ContactsActions.saveSuccessAction({ newcontact })
          }),
          catchError(error => {
            return observableOf(ContactsActions.saveFailureAction({ error }))
          })
        )
      })
  ))

  updateRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.updateRequestAction),
    switchMap((action) => {
      return this.dataService.updateContact(action).pipe(
          map((update:any) => {
              return ContactsActions.updateSuccessAction({update})
         }),
          catchError(error => {
            return observableOf(ContactsActions.updateFailureAction({ error }))
          })
        )
      })
  ))


  deleteRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.deleteRequestAction),
    switchMap((actions) => {
      return this.dataService.deleteContact(actions.id).pipe(
          map(() => {
              return  ContactsActions.deleteSuccessAction({id:actions.id})
          }),
          catchError(error => {
            return observableOf(ContactsActions.deleteFailureAction({ error }))

          })
        )
    })
  ))
}