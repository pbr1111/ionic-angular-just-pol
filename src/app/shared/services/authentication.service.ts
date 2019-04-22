import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

export interface User {
    email: string;
    role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private authStateObservable: Observable<firebase.User> = null; 
    private userUID: string = null;
    public user: User = null;

    constructor(private afAuth: AngularFireAuth, private firebaseService: FirebaseService) {
        this.authStateObservable = this.afAuth.authState;

        this.authStateObservable.subscribe(user => {
            this.userUID = user ? user.uid : null;
            this.updateUserInfo();
        });
    }

    public get isUserLoggedIn(): Observable<boolean> {
        return this.authStateObservable.pipe(map(user => {
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
    
    private updateUserInfo(): void {
        this.firebaseService.database.object(`/users/${this.userUID}`).query.once('value')
            .then(response => {
                this.user = response.val();
            });
    }
}