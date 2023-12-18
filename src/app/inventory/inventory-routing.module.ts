import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {
  InventoryItemAddEditComponent
} from "./inventory-item/inventory-item-add-edit/inventory-item-add-edit.component";
import {InventoryItemListComponent} from "./inventory-item/inventory-item-list/inventory-item-list.component";
import {
  InventoryItemStockAddComponent
} from "./inventory-item-stock/inventory-item-stock-add/inventory-item-stock-add.component";
import {
  InventoryItemStockConsumeComponent
} from "./inventory-item-stock/inventory-item-stock-consume/inventory-item-stock-consume.component";

const inventoryRoutes: Route[] = [
  {
    path: '', children: [
      {path: 'add', component: InventoryItemAddEditComponent},
      {path: 'edit/:id', component: InventoryItemAddEditComponent},
      {path: 'list', component: InventoryItemListComponent},
    ]
  },
  {
    path: 'stocks', children: [
      {path: 'add', component: InventoryItemStockAddComponent},
      {path: 'consume', component: InventoryItemStockConsumeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(inventoryRoutes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {
}
