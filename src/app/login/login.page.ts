import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../shared/services/page.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { IonInput } from '@ionic/angular';

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
export class LoginPage implements OnInit, AfterViewInit {

  public loginForm: FormGroup = null;

  @ViewChild('emailInput')
  private emailInput: IonInput = null;

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
  
  public ngAfterViewInit(): void {
   this.emailInput.setFocus();
  }

  public login(): void {
    this.pageService.wait();
    const formData: LoginFormData = this.loginForm.value as LoginFormData;
    this.authenticationService.loginUser(formData.email, formData.password)
      .then(() => this.pageService.navigateTo('/order-list'))
      .catch(error => this.pageService.showError(error))
      .finally(() => this.pageService.continue())
  }

}
