import { Component, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListViewEventData } from "nativescript-ui-listview";

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Item",
    templateUrl: "./item.component.html",
    styleUrls: ["item.component.css"]
})
export class ItemComponent implements OnInit {
    private _products : ObservableArray<Product>
    private _isEnabled: boolean;
    private _myFilteringFunc: (product: any) => any;
    public category;

    //@ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    constructor(
        private _productService: ProductService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _activateRoute: ActivatedRoute
    ) {
        this.myFilteringFunc = (product: Product) => {
            return product && product.category.includes(this.category);
        };
        this.isEnabled = true;
     }

    ngOnInit(): void {
        this._products = new ObservableArray(this._productService.getProducts());
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                this.category = params.category;

            });
        console.log("la categoria recibida es: "+this.category)
    }

    toggleFilter() {
        
        if (this.isEnabled) {
            this.myFilteringFunc = (product: Product) => {
                return product && product.category.includes("");
            };
            //listView.filteringFunction = undefined;
            this.isEnabled = false;
        } else {
            this.myFilteringFunc = (product: Product) => {
                return product && product.category.includes(this.category);
            };
            //listView.filteringFunction = this.myFilteringFunc;
            this.isEnabled = true;
            
        }
    }

    get products(): ObservableArray<Product> {
        return this._products;
    }

    get myFilteringFunc(): (product: any) => any {
        return this._myFilteringFunc;
    }

    set myFilteringFunc(value: (product: any) => any) {
        this._myFilteringFunc = value;
    }

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(value: boolean) {
        this._isEnabled = value;
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

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}