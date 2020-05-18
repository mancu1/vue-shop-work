import { ItemProductType } from "@/types/ItemProductType";

export interface CartItemType extends ItemProductType {
  count: number;
}
