import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { OrderProduct } from '../models/orders/order-product.model';
import { Observable } from 'rxjs';
import { PageService } from '../shared/services/page.service';
import { Product } from '../models/orders/product.model';
import { map } from 'rxjs/operators';
import { Order, OrderStatus } from '../models/orders/order.model';
import { query, group, transition, trigger, style, animate, sequence } from '@angular/animations';


interface ProductGroup {
  group: string;
  products: Product[];
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('addArticle', [
      transition(':increment', group([
        query('#add-circle', [
          sequence([
            style({ visibility: 'visible', opacity: 0, top: -20, left: 12 }),
            animate('200ms ease-out', style({ top: 7, opacity: 0.7 })),
            animate('100ms ease-in', style({ opacity: 0 })),
            style({ visibility: 'hidden' }),
          ]),
        ], { optional: true }),
        query('#shopping-cart', [
          sequence([
            animate('300ms ease-in', style({ paddingTop: 5 })),
            animate('100ms ease-in', style({ paddingTop: '*' })),
          ])
        ], { optional: true })
      ])),
      transition(':decrement', group([
        query('#remove-circle', [
          sequence([
            style({ visibility: 'visible', opacity: 1, top: 7, left: 12 }),
            animate('250ms ease-out', style({ top: -10, opacity: 0.5 })),
            animate('50ms ease-out', style({ opacity: 0 })),
            style({ visibility: 'hidden' }),
          ]),
        ], { optional: true }),
        query('#shopping-cart', [
          sequence([
            animate('300ms ease-in', style({ paddingBottom: '5px' })),
            animate('100ms ease-in', style({ paddingBottom: '*' })),
          ])
        ], { optional: true })
      ]))
    ])
  ]
})
export class CreateOrderPage implements OnInit {

  public orderProducts: OrderProduct[] = [];
  public groupedProducts: Observable<ProductGroup[]> = null;

  constructor(private pageService: PageService, private firebaseService: FirebaseService) {
    this.loadProducts();
  }

  public ngOnInit(): void {
    // this.productDBList.push(<IProduct>{
    //     id: 31,
    //     name: "Maki salmón",
    //     price: 1,
    //     group: "Makis",
    //     image: "data:image/png;base64,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",
    // });
    //  this.productDBList.push(<IProduct>{
    //     id: 32,
    //     name: "Maki aguacate",
    //     price: 1,
    //     group: "Makis",
    //     image: "data:image/png;base64,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",
    // });

    // this.productDBList.push(<IProduct>{
    //     id: 22,
    //     name: "Niguiri salmón",
    //     price: 1,
    //     group: "Niguiris",
    //     image: "data:image/png;base64,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",
    // });
  }

  public loadProducts(): void {
    this.groupedProducts = this.firebaseService.database.list<Product>('products').valueChanges().pipe(map(data => {
      let groupedProducts: { [group: string]: Product[] } = {};
      data.forEach(product => {
        if (groupedProducts[product.group] == null) {
          groupedProducts[product.group] = [];
        }
        groupedProducts[product.group].push(product);
      });
      let products: ProductGroup[] = [];
      for (let group in groupedProducts) {
        products.push({
          group: group,
          products: groupedProducts[group]
        });
      }
      return products;
    }));
  }

  public isProductInOrder(product: Product): boolean {
    return this.getProductInOrder(product) != null;
  }

  public getProductInOrder(product: Product): OrderProduct {
    return this.orderProducts != null ?
      this.orderProducts.find(prod => prod.id == product.id) : null;
  }

  public get total(): number {
    return this.orderProducts != null ?
      this.orderProducts.reduce((sum, value2) => sum + value2.quantity, 0) : 0;
  }

  public addToCart(product: Product): void {
    let productOrder = this.getProductInOrder(product);
    if (productOrder == null) {
      productOrder = {
        id: product.id,
        quantity: 0
      };
      this.orderProducts.push(productOrder);
    }
    productOrder.quantity++;
  }

  public removeFromCart(product: Product): void {
    let productOrder = this.getProductInOrder(product);
    if (productOrder != null) {
      productOrder.quantity--;
      if (productOrder.quantity == 0) {
        this.orderProducts.splice(this.orderProducts.indexOf(productOrder), 1);
      }
    }
  }

  public onCreateOrder(): void {
    let orderDBList = this.firebaseService.database.list('orders');
    let order: Order = {
      orderDate: new Date().toISOString(),
      products: this.orderProducts,
      state: OrderStatus.Created
    };
    orderDBList.push(order);
    this.pageService.navigateTo('/order-list');
  }

}
