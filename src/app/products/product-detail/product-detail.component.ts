import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
    selector: "ProductDetail",
    templateUrl: "./product-detail.component.html"
})
export class ProductDetailComponent implements OnInit {
    private _product : Product;

    constructor(
        private _productService: ProductService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const productId = params.id;

                this._product = this._productService.getProductById(productId);
            });
    }

    get product(): Product {
        return this._product;
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}