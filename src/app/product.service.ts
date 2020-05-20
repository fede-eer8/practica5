import { Injectable, NgZone } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as firebase from "nativescript-plugin-firebase";

import { Product } from "./product.model";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private _products: Array<Product> = [];

    constructor(private _ngZone: NgZone) { }

    getProductById(id: string): Product {
        if(!id) {
            return;
        }
        return this._products.filter((product) => {
            return product.id === id;
        })[0];
    }

    getCategorias(): Array<string> {
        let categ = Array<string>(); 
        categ = this._products.map((products => { 
                if(products.category != "") {
                    return products.category;
                }else{
                    return null;
                }
            }));
        categ = categ.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
               return elem
            }
          })
        return categ;
    }

    getProducts(): Array<Product> {
        return this._products
    }

    getFeatured(): Array<Product> {
        return this._products.filter((product) => {
            return product.discount > 0;
        });
    }
    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "products";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };    
            firebase.addValueEventListener(onValueEvent, `/${path}`); 
        }).pipe(catchError(this.handleErrors));    
    }

    private handleSnapshot(data: any): Array<Product> {
        this._products = [];
        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._products.push(new Product(data[id]));
                }
            }
        }
        return this._products;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}    
