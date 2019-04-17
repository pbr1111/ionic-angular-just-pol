import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuthenticated: boolean = false;

    constructor(private afAuth: AngularFireAuth) {
    }

    public get isUserLoggedIn(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(user => {
            return user != null;
        }));
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