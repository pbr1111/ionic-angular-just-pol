import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateOrderPage } from './create-order.page';
import { LocaleModule } from '../shared/modules/locale.module';
import { SharedModule } from '../shared/modules/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CreateOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LocaleModule,
    SharedModule
  ],
  declarations: [CreateOrderPage]
})
export class CreateOrderPageModule { }
