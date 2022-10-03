import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalService } from 'src/app/shared/swal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  validationForm: FormGroup | any;

 constructor(private router: Router,private log: AuthService, private toast: SwalService, private logService: AuthService, private loading: NgxSpinnerService
      ) {
    }

      ngOnInit() {
        this.validationForm = new FormGroup({
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
            Validators.maxLength(25)
          ])),
            userName: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9_-]{3,15}$')
          ])),
          password: new FormControl('',  Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25)
          ]))
        });
       }
      get userName() { return this.validationForm.get('userName'); }
      get email() { return this.validationForm.get('email'); }
      get password() { return this.validationForm.get('password'); }

  onSubmit(f:any) {
    this.loading.show(),
     this.logService.register(f).subscribe(
      res => {
        this.loading.hide();
        this.toast.top( res.msg);
        this.router.navigate(['/contact']);
        this.validationForm.reset();
        this.log.getToken();
        this.loading.hide()

      },
   err => {
        this.toast.show( err.error.msg);
        this.validationForm.reset();
        this.loading.hide();
  }
  );
  }


}
