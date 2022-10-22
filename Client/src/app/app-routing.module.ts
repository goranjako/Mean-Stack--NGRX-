import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './index/not-found/not-found.component';

const routes: Routes = [


  {path:"", redirectTo:"contacts",pathMatch:"full"},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),canActivate:[AuthGuard]  },
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
