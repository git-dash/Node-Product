import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayProductsComponent } from './display-products/display-products.component';
// import { EditProductsComponent } from './edit-products/edit-products.component';
// import { SearchProductsComponent } from './search-products/search-products.component';
// import { DeleteProductsComponent } from './delete-products/delete-products.component';
// import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-product', pathMatch: 'full' },
  { path: 'all-product', component: DisplayProductsComponent },
  { path: 'product/:isEdit/:productId', component: ProductComponent },
  // { path: 'add-product/:isEdit/:productId', component: AddProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
