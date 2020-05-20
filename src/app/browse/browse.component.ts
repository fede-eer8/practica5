import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { ListViewEventData } from "nativescript-ui-listview";

import { Product } from "../product.model";
import { ProductService } from "../product.service";

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as firebase from "nativescript-plugin-firebase";
import { ActivatedRoute } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html",
    styleUrls: ["browse.component.css"]
})
export class BrowseComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _products: ObservableArray<Product> = new ObservableArray<Product>([]);
    private _dataSubscription: Subscription;
    private _category = Array<String>();
    public _prod;
    public _isEnabled: boolean;
    private _myFilteringFunc: (product: any) => any;
    public searchPhrase: string;

    constructor(
        private _productService: ProductService,
        private _routerExtensions: RouterExtensions,
        private _activateRoute: ActivatedRoute) {
            // this.myFilteringFunc = (product: Product) => {
            //     return product && product.name.includes("");
            // };
            this.isEnabled = false;
        }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._productService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((products: Array<Product>) => {
                    this._products = new ObservableArray(products)
                    // this._category = this._products.map((products => { 
                    //     if(products.category != "") {
                    //         return products.category;
                    //     }else{
                    //         return null;
                    //     }
                    // }));
                    // this._category = this._category.filter((elem, i, arr) => {
                    //     if (arr.indexOf(elem) === i) {
                    //       return elem
                    //     }
                    //   })
                    //this._prod = this._productService.;
                    this._category = this._productService.getCategorias()
                    //console.log(this._category)
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

    onTap(args: EventData) {
        let button = args.object as Button;
        //const tappedProductItem = args.object.ge;
        this._routerExtensions.navigate(["../category"],
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

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
        this.myFilteringFunc = (product: Product) => {
            return product && product.name.includes(`${searchBar.text}`);
        };
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
        this.myFilteringFunc = (product: Product) => {
            return product && (product.name.includes(""));
        };
    }

    onSearch(args: EventData) {
        this._isEnabled=!this._isEnabled
    }

}
