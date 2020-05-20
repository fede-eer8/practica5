import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
//import { switchMap } from "rxjs/operators";
import { ItemEventData } from "tns-core-modules/ui/list-view";
//import { ListPicker } from "tns-core-modules/ui/list-picker";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Category",
    templateUrl: "./category.component.html"
})
export class CategoryComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _products: ObservableArray<Product> = new ObservableArray<Product>([]);
    private _dataSubscription: Subscription;
    private _category = Array<String>();

    constructor(
        private _productService: ProductService,
        private _routerExtensions: RouterExtensions, 
        private _activateRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._productService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((products: Array<Product>) => {
                    this._products = new ObservableArray(products)
                    //this._prod = this._products;
                    this._category = this._productService.getCategorias()
                    console.log(this._category)
                    this._isLoading = false;
                });
        }
        
        // this._pageRoute.activatedRoute
        //     .pipe(switchMap((activatedRoute) => activatedRoute.params))
        //     .forEach((params) => {
        //         this._products = params;
        //         //console.log(this._products)
        //         //this._product = this._productService.getProductById(productId);
        //     });
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

    public onItemTap(args: ItemEventData) {
        // const picker = <ListPicker>args.object;
        // console.log(`index: ${picker.selectedIndex}; item" ${this.category[picker.selectedIndex]}`);
        console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.category[args.index]}`)
        this._routerExtensions.navigate(["../item", `${this.category[args.index]}`],
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

    templateSelector(item: Product, index: number, items: any) {
        return index % 2 === 0 ? "red" : "green";
    }
}