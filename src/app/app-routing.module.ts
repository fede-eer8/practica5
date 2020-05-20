import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";

import { HomeComponent } from "./home/home.component";
import { BrowseComponent } from "./browse/browse.component";
import { FeaturedComponent } from "./featured/featured.component";
import { SearchComponent } from "./search/search.component";
import { CategoryComponent } from "./category/category.component";
import { ItemComponent } from "./item/item.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { LoginComponent } from "./login/login.component";
//import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(browseTab:browse//searchTab:search//featuredTab:featured//categoryTab:category)",
        pathMatch: "full"
    },

    // {
    //     path: "home",
    //     component: HomeComponent,
    //     //loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule),
    //     outlet: "homeTab"
    // },
    {
        path: "login",
        component: LoginComponent,
        //loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule),
    },
    {
        path: "browse",
        component: BrowseComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab"
    },
    { 
        path: "category",
        component: CategoryComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab" 
    },
    { 
        path: "category",
        component: CategoryComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "categoryTab" 
    },
    { 
        path: "item/:category",
        component: ItemComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "categoryTab" 
    },
    { 
        path: "item/:category",
        component: ItemComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab" 
    },
    { 
        path: "item-detail/:id",
        component: ItemDetailComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab" 
    },
    { 
        path: "item/item-detail/:id",
        component: ItemDetailComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab" 
    },
    { 
        path: "item/item-detail/:id",
        component: ItemDetailComponent,
        //loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "categoryTab" 
    },
    {
        path: "search",
        component: SearchComponent,
        //loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
    },
    {
        path: "featured",
        component: FeaturedComponent,
        //loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "featuredTab"
    },
    {
        path: "item-detail/:id",
        component: ItemDetailComponent,
        //loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "featuredTab"
    }
];

// const routes: Routes = [
//     { path: "", redirectTo: "/home", pathMatch: "full" },
//     { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
//     { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
//     { path: "browse/category", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
//     { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
//     { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
//     { path: "products", loadChildren: () => import("~/app/products/products.module").then((m) => m.ProductsModule) },
//     { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
//     //{ path: "item/:id", component: ItemDetailComponent }
// ];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
