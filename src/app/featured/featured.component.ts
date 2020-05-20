import { Component, OnInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html",
    styleUrls: ["featured.component.css"]
})
export class FeaturedComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _products: ObservableArray<Product> = new ObservableArray<Product>([]);
    private _dataSubscription: Subscription;
    private _productDisc: ObservableArray<Product>;

    constructor(private _productService: ProductService,
        private _routerExtensions: RouterExtensions,
        private _activateRoute: ActivatedRoute) {}

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._productService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((products: Array<Product>) => {
                    this._products = new ObservableArray(products)
                    this._productDisc = new ObservableArray(this._productService.getFeatured());
                    console.log(this._productDisc);
                    //this._prod = this._products;
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

    get products(): ObservableArray<Product> {
        return this._products;
    }

    get productsDisc(): ObservableArray<Product> {
        return this._productDisc;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onProductTap(args: ListViewEventData): void {
        const tappedProductItem = args.view.bindingContext;
        this._routerExtensions.navigate(["../item-detail", tappedProductItem.id],
        {
            relativeTo: this._activateRoute,
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

    public onBack() {
        this._routerExtensions.back();
        
	}
}
