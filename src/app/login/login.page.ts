import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../shared/services/page.service';
import { AuthenticationService } from '../shared/services/authentication.service';

interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = null;

  constructor(private pageService: PageService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.pageService.wait();
      const formData: LoginFormData = this.loginForm.value as LoginFormData;
      this.authenticationService.loginUser(formData.email, formData.password)
        .then(() => this.pageService.navigateTo('/order-list'))
        .catch(error => this.pageService.showError(error))
        .finally(() => this.pageService.continue())
    }
  }
  
}
