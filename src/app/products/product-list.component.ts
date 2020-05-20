import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";

import { Product } from "../product.model";
import { ProductService } from "../product.service";

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "ns-products",
    templateUrl: "./product-list.component.html"
})
export class ProductListComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _products: ObservableArray<Product> = new ObservableArray<Product>([]);
    private _dataSubscription: Subscription;
    private _category;

    constructor(
        private _productService: ProductService,
        private _routerExtensions: RouterExtensions) { }
    
    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._productService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((products: Array<Product>) => {
                    this._products = new ObservableArray(products)
                    this._category = this._products.map((products => { 
                        if(products.category != "") {
                            return products.category;
                        }else{
                            return null;
                        }
                    }));
                    this._category = this._category.filter((elem, i, arr) => {
                        if (arr.indexOf(elem) === i) {
                          return elem
                        }
                      })
                    console.log(this._category)
                    this._isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        if(this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

    get category(): any {
        return this._category;
    }
    get products(): ObservableArray<Product> {
        return this._products;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
    
    getProductsByCategory(category: string) {
        this._category.map(products => this._products.filter(products => products.category === category));
    }

    onProductTap(args: ListViewEventData): void {
        const tappedProductItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/products/product-detail", tappedProductItem.id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
