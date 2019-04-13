import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationModule } from './shared/modules/authentication.module';

const routes: Routes = [
  { path: '', redirectTo: 'order-list', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'order-list', loadChildren: './order-list/order-list.module#OrderListPageModule', canActivate: [AuthGuard] },
  { path: 'create-order', loadChildren: './create-order/create-order.module#CreateOrderPageModule', canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [
    AuthenticationModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
