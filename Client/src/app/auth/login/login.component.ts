import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private log: AuthService,
    private toast: SwalService,
    private loading: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(25),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ])
    ),
  });
//get email
  get email() {
    return this.registerForm.get('email');
  }
//get password
  get password() {
    return this.registerForm.get('password');
  }
//submit Form
  onSubmit(f: any) {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading.show();
    this.log.login(f).subscribe(
      (    res: { msg: any; }) => {
      this.router.navigate(['/todo']);
      this.toast.top( res.msg);
      this.registerForm.reset();
      this.log.getToken();
      this.loading.hide();
    },
      (err: { error: { msg: any; }; }) => {
      this.toast.show( err.error.msg);
      this.router.navigate(['/register']);
      this.registerForm.reset();
      this.loading.hide();
    }
  );
  }
}
