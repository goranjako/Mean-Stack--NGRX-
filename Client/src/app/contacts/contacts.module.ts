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
    MaterialModule,
    NgxSpinnerModule,
    StoreModule.forRoot({{'contacts': contactReducer}}, {}),
    EffectsModule.forRoot([]ContactEffect )
  ]
})
export class ContactsModule { }
