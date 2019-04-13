import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { Order } from '../models/orders/order.model';
import { PageService } from '../shared/services/page.service';
import { FirebaseService } from '../shared/services/firebase.service';
import { map } from 'rxjs/operators';
import { ArrayHelper } from '../shared/helpers/array.helper';
import { LocaleService } from '../shared/services/locale.service';

interface OrderSnapshot {
  key: string;
  data: Order;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  public orders: Observable<OrderSnapshot[]> = null;
  private orderDBList: AngularFireList<Order> = null;

  constructor(private localeService: LocaleService,
    private pageService: PageService,
    private firebase: FirebaseService) {
  }

  public ngOnInit(): void {
    this.orderDBList = this.firebase.database.list('orders');
    this.loadOrders();
  }

  public loadOrders(): void {
    this.orders = this.orderDBList.snapshotChanges().pipe(map(actions => {
      return ArrayHelper.sort(actions.map(action => {
        return { key: action.key, data: action.payload.val() };
      }), i => i.data.orderDate).reverse();
    }));
  }

  public onCreateOrder(): void {
    this.pageService.navigateTo('/create-order');
  }

  public onRemoveOrder(order: OrderSnapshot): void {
    this.pageService.showConfirmationDialog(this.localeService.getTranslation("removeOrderConfirm"), this.localeService.getTranslation("remove"))
      .then(() => this.removeOrder(order));
  }

  public removeOrder(order: OrderSnapshot): void {
    this.orderDBList.remove(order.key);
  }
}
