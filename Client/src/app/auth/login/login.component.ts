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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: AuthService,
    private toast: SwalService,
    private loading: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
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
    return this.loginForm.get('email');
  }
  //get password
  get password() {
    return this.loginForm.get('password');
  }
  //submit Form
  onSubmit(f: any) {
    this.loading.show(),
      this.loginService.login(f).subscribe({
        next: (res) => {
          this.loading.hide();
          this.toast.success(res.msg);
          this.router.navigate(['/contacts']);
          this.loginForm.reset();
          this.loginService.getToken();
          this.loading.hide();
        },
        error: (err) => {
          this.toast.err(this.loginService.errorHandl(err));
          this.loginForm.reset();
          this.loading.hide();
        },
      });
  }
}
