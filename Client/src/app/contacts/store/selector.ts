import { createFeatureSelector } from "@ngrx/store";
import {Contact } from "../contact";



export const selectContacts = createFeatureSelector<Contact[]>('contacts');
