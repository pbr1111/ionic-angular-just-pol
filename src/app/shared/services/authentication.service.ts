import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public user: firebase.User;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            console.log("AA", this.user);
            this.user = user;
        });
    }

    public get isUserLoggedIn(): boolean {
        return this.user != null;
    }

    public loginUser(email: string, password: string): Promise<boolean> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
            return response != null && response.user != null;
        });
    }

    public logout(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
}