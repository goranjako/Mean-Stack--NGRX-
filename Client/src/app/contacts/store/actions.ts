import { Action, createAction, props } from '@ngrx/store';
import { Contact } from '../Contact';



export enum ActionTypes {
  LOAD_Contacts_REQUEST = '[Contacts] Load Contacts Request',
  LOAD_Contacts_FAILURE = '[Contacts] Load Contacts Failure',
  LOAD_Contacts_SUCCESS = '[Contacts] Load Contacts Success',

  LOAD_REQUEST = '[Contacts] Load Request',
  LOAD_FAILURE = '[Contacts] Load Failure',
  LOAD_SUCCESS = '[Contacts] Load Success',

  SAVE_REQUEST = '[Contacts] Save',
  SAVE_FAILURE = '[Contacts] Save Failure',
  SAVE_SUCCESS = '[Contacts] Save Success',

  UPDATE_REQUEST = '[Contacts] Update',
  UPDATE_FAILURE = '[Contacts] Update Failure',
  UPDATE_SUCCESS = '[Contacts] Update Success',

  DELETE_REQUEST = '[Contacts] Delete',
  DELETE_FAILURE = '[Contacts] Delete Failure',
  DELETE_SUCCESS = '[Contacts] Delete Success'
}

//ID
 const loadContactsRequestAction = createAction(
  ActionTypes.LOAD_Contacts_REQUEST,
  props<{ id: string }>()
);

 const loadContactsSuccessAction = createAction(
  ActionTypes.LOAD_Contacts_SUCCESS,
  props<{ Contact: any }>()
);

 const loadContactsFailureAction = createAction(
  ActionTypes.LOAD_Contacts_FAILURE,
  props<{ error: string }>()
);

///////ALL

 const loadRequestAction = createAction(
  ActionTypes.LOAD_REQUEST,

);

 const loadFailureAction = createAction(
  ActionTypes.LOAD_FAILURE,
  props<{ error: string }>()
);

 const loadSuccessAction = createAction(
  ActionTypes.LOAD_SUCCESS,
  props<{ items: Contact[] }>()
);

////////ADD

 const saveRequestAction = createAction(
  ActionTypes.SAVE_REQUEST,
  props<{ newitem:Contact}>()
);

 const saveFailureAction = createAction(
  ActionTypes.SAVE_FAILURE,
  props<{ error: string }>()
);

 const saveSuccessAction = createAction(
  ActionTypes.SAVE_SUCCESS,
  props<{ newitem: Contact }>()
);

///Update

 const updateRequestAction = createAction(
  ActionTypes.UPDATE_REQUEST,
  props<{update: any}>()
);
 const updateFailureAction = createAction(
  ActionTypes.UPDATE_FAILURE,
  props<{ error:  string | null }>()
);

 const updateSuccessAction = createAction(
  ActionTypes.UPDATE_SUCCESS,
  props<{update: any}>()
);

////Delete

 const deleteRequestAction = createAction(
  ActionTypes.DELETE_REQUEST,
  props<{ id: any }>()
);

 const deleteFailureAction = createAction(
  ActionTypes.DELETE_FAILURE,
  props<{ error:  string | null }>()
);

 const deleteSuccessAction = createAction(
  ActionTypes.DELETE_SUCCESS,
  props<{ id:any }>()
);
export const ContactsActions = {
  loadContactsRequestAction,
  loadContactsSuccessAction,
  loadContactsFailureAction,
  loadRequestAction,
  loadSuccessAction,
  loadFailureAction,
  saveRequestAction,
  saveSuccessAction,
  saveFailureAction,
  updateRequestAction,
  updateSuccessAction,
  updateFailureAction,
  deleteRequestAction,
  deleteSuccessAction,
  deleteFailureAction

};
