import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactsEffect } from './store/efect';
import { contactsReducer } from './store/redux';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ContactsComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    MaterialModule,
    SweetAlert2Module.forChild(),
    NgxSpinnerModule,
    StoreModule.forFeature('contacts', contactsReducer ),
    EffectsModule.forFeature([ContactsEffect ]),
  ]
})
export class ContactsModule { }
