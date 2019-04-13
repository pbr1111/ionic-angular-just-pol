import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseModule } from './firebase.module';

@NgModule({
    imports: [
        FirebaseModule
    ],
    providers: [
        AngularFireAuth,
        AuthenticationService
    ]
})
export class AuthenticationModule { }