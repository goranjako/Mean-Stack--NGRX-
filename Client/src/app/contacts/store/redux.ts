import { Contact } from '../contact';
import { createReducer, on } from '@ngrx/store';
import { ContactsActions } from './actions';

export interface BookState {
  contacts: Contact[];
  loaded: boolean;
  error?: string | null;
}

export const initialBookState: BookState = {
  contacts: [],
  loaded: false,
  error: null,
};
export const initialState: ReadonlyArray<Contact> = [];

export const ContactsReducer = createReducer(
  initialState,
  on(ContactsActions.loadSuccessAction, (state, { items }) => {
    return items;
  }),
  on(ContactsActions.loadContactsSuccessAction, (state, { Contact }) => {
    return Contact;
  }),
  on(ContactsActions.deleteSuccessAction, (state, { id }) => {
    let newState = state.filter((_) => _._id !== id);
    return newState;
  }),
  on(ContactsActions.updateSuccessAction, (state, { update }) => {
    let newState = state.filter((_) => _._id != update.id);
    newState.unshift(update);
    return newState;
  }),
  on(ContactsActions.saveSuccessAction, (state, { newitem }) => {
    let newState = [...state];
    newState.unshift(newitem);
    return newState;
  })
);
