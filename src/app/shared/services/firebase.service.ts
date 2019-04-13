import { Firebase } from '@ionic-native/firebase/ngx';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    constructor(private firebase: Firebase, public database: AngularFireDatabase) {
       
    }
}