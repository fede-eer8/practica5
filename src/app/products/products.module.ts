import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "../products/product-detail/product-detail.component";

@NgModule({
    imports: [
        ProductsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent
    ],
    providers: [],
    schemas: [ 
        NO_ERRORS_SCHEMA 
    ]
})
export class ProductsModule {}