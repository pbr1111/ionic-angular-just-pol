import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { firebaseConfig } from '../config/firebase.config';

@NgModule({
    imports: [
        HttpClientModule,
        AngularFireModule,
        AngularFireDatabaseModule
    ],
    providers: [
        Firebase,
        FirebaseService
    ]
})
export class FirebaseModule { 

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FirebaseModule,
            providers: [
                ...AngularFireModule.initializeApp(firebaseConfig).providers
            ]
        };
    }
}