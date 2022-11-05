
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf,withLatestFrom, mergeMap, switchMap, } from 'rxjs';
import { catchError, map, startWith, } from 'rxjs/operators';
import {Contact } from '../customer';
import { ServisService } from '../servis.service';

import {ContactsActions} from './actions';
import { Store } from '@ngrx/store';


@Injectable()
export class ContactsEffect {
  constructor(private dataService: ServisService,  private actions$: Actions, private store: Store,) {}

  loadCustomersRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CustomersActions.loadCustomersRequestAction),
      switchMap(action => {
        const subject = "Customer";
        return this.dataService.getTodo(action.id).pipe(
          map((customer: any) => {
              returnContactsActions.loadCustomersSuccessAction({Contact })
          }),
          catchError((error: any) => {
            return observableOf(CustomersActions.loadCustomersFailureAction({ error }))
          })
        )
      })
  ))
/*
  deleteBooksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
*/

  loadRequestEffect$
  = createEffect(() => this.actions$.pipe(
    ofType(CustomersActions.loadRequestAction),
      mergeMap(() => this.dataService.getTodos().pipe(
          map((items:Customer[]) => {
              returnContactsActions.loadSuccessAction({ items })
          }),
          catchError(error => {
            return observableOf(CustomersActions.saveFailureAction({ error }))
          })
        )
      )
  )
  );



  saveRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CustomersActions.saveRequestAction),
      switchMap((action) => {
        return this.dataService.postTodo(action.newitem).pipe(
          map((newitem:Contact) => {
              returnContactsActions.saveSuccessAction({ newitem })
          }),
          catchError(error => {
            return observableOf(CustomersActions.saveFailureAction({ error }))
          })
        )
      })
  ))

  updateRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CustomersActions.updateRequestAction),
    switchMap((action) => {
      return this.dataService.updateTodo(action).pipe(
          map((update:any) => {
              returnContactsActions.updateSuccessAction({update})
         }),
          catchError(error => {
            return observableOf(CustomersActions.updateFailureAction({ error }))
          })
        )
      })
  ))
/*
   updateBookAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISucess({ updateBook: data });
          })
        );
      })
    );
  });

*/
  deleteRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CustomersActions.deleteRequestAction),
    switchMap((actions) => {
      return this.dataService.deleteTodo(actions.id).pipe(
          map(() => {
              return ContactsActions.deleteSuccessAction({id:actions.id})
          }),
          catchError(error => {
            return observableOf(CustomersActions.deleteFailureAction({ error }))
          })
        )
    })
  ))
}
