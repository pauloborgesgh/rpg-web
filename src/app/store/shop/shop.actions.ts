import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Item } from '../../models';

export interface ShopItem extends Item {
  quantity: number;
}

export const ShopActions = createActionGroup({
  source: 'Shop',
  events: {
    'Open Shop': emptyProps(),
    'Close Shop': emptyProps(),
    'Buy Item': props<{ item: Item }>(),
    'Sell Item': props<{ itemId: string }>(),
    'Refresh Shop': emptyProps(),
  }
});