
import { createReducer, on } from '@ngrx/store';
import { Contact } from '../contact';
import { ContactsActions} from './actions';


export interface ContactState {
  contacts: Contact[];
  loaded: boolean;
  error?: string | null;
}

export const initialContactState: ContactState = {
  contacts: [],
  loaded: false,
  error: null,
};
export const initialState: ReadonlyArray<Contact> = [];

export const contactsReducer = createReducer(
  initialState,
 on( ContactsActions.loadSuccessAction, (state, { contact }) => {
  return contact;
}),
 on( ContactsActions.loadContactsSuccessAction, ( state,{ contact }) => {
 return contact;
  }),
  on(ContactsActions.deleteSuccessAction, (state, { id }) => {
    let newState =state.filter((_) => _._id!==id);
    return newState;
  }),
  on( ContactsActions.updateSuccessAction, (state, { update }) => {
    let newState = state.filter((_) => _._id!=update.id);
    newState.unshift(update);
    return newState;
  }),
  on( ContactsActions.saveSuccessAction, (state, { newcontact }) => {
    let newState = [...state];
    newState.unshift(newcontact);
    return newState;
  }),
  on( ContactsActions.saveFailureAction, (state,error ) => ({ ...state, error
   }))




);
