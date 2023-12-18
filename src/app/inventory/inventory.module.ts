import {NgModule} from "@angular/core";
import {
  InventoryItemAddEditComponent
} from "./inventory-item/inventory-item-add-edit/inventory-item-add-edit.component";
import {InventoryRoutingModule} from "./inventory-routing.module";
import {InventoryItemListComponent} from "./inventory-item/inventory-item-list/inventory-item-list.component";
import {
  InventoryItemStockAddComponent
} from "./inventory-item-stock/inventory-item-stock-add/inventory-item-stock-add.component";
import {
  InventoryItemStockConsumeComponent
} from "./inventory-item-stock/inventory-item-stock-consume/inventory-item-stock-consume.component";

@NgModule({
  declarations: [
    InventoryItemAddEditComponent,
    InventoryItemListComponent,
    InventoryItemStockAddComponent,
    InventoryItemStockConsumeComponent
  ],
  imports: [
    InventoryRoutingModule
  ]
})
export class InventoryModule {
}
