import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BrowseComponent } from "./browse/browse.component";
import { CategoryComponent } from "./category/category.component";
import { ItemComponent } from "./item/item.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";
import { LoginComponent } from "./login/login.component";

import { ProductService } from "./product.service";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { FeaturedComponent } from "./featured/featured.component";
// import { ProductListComponent } from "./products/product-list.component";
// import { SettingsComponent } from "./settings/settings.component";
//import { ItemsComponent } from "./item/items.component";
//import { ItemDetailComponent } from "./item/item-detail.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptCommonModule,
        //BrowseRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        BrowseComponent,
        SearchComponent,
        FeaturedComponent,
        // ProductListComponent,
        // SettingsComponent
        //ItemsComponent,
        ItemDetailComponent,
        BrowseComponent,
        CategoryComponent,
        ItemComponent,
        ItemDetailComponent,
        LoginComponent
    ],
    providers: [
        ProductService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
