import { ActionContext } from "vuex";
import { RootState } from "@/store";
import { CartItemType } from "@/types/CartItemType";
import {
  DEC_ITEM_TO_CART,
  EDIT_ALL_CARD,
  INC_ITEM_TO_CART,
} from "@/store/modules/cartModule/action-types";
import { ItemProductType } from "@/types/ItemProductType";
import {
  SET_ALL_CARD,
  SET_DEC_ITEM_IN_CART,
  SET_INC_ITEM_IN_CART,
} from "@/store/modules/cartModule/mutation-types";
import { Vue } from "vue-property-decorator";

export interface CartStateType {
  currentCart: CartItemType[];
}

const state: CartStateType = {
  currentCart: [],
};

const getters = {
  getAllCart: (state: CartStateType) => state.currentCart,
  getCartItemById: (state: CartStateType) => (id: string) =>
    state.currentCart.find((el) => el.id === id),
};

const actions = {
  [INC_ITEM_TO_CART](
    context: ActionContext<CartStateType, RootState>,
    item: ItemProductType
  ) {
    context.commit(SET_INC_ITEM_IN_CART, item);
  },
  [DEC_ITEM_TO_CART](
    context: ActionContext<CartStateType, RootState>,
    item: ItemProductType
  ) {
    context.commit(SET_DEC_ITEM_IN_CART, item);
  },
  [EDIT_ALL_CARD](
    context: ActionContext<CartStateType, RootState>,
    allCart: CartItemType[]
  ) {
    context.commit(SET_ALL_CARD, allCart);
  },
};

const mutations = {
  [SET_INC_ITEM_IN_CART](state: CartStateType, item: ItemProductType) {
    const itemInCart = state.currentCart.find((el) => el.id === item.id);
    if (itemInCart) {
      const index = state.currentCart.indexOf(itemInCart);
      console.log("inc", index);
      Vue.set(state.currentCart, index, {
        ...itemInCart,
        count: itemInCart.count + 1,
      });
    } else {
      Vue.set(state, "currentCart", [
        ...state.currentCart,
        { ...item, count: 1 },
      ]);
    }
  },
  [SET_DEC_ITEM_IN_CART](state: CartStateType, item: ItemProductType) {
    const itemInCart = state.currentCart.find((el) => el.id === item.id);
    if (itemInCart) {
      const index = state.currentCart.findIndex((el) => el.id === item.id);
      console.log("dec", index);
      if (itemInCart.count > 1)
        Vue.set(state.currentCart, index, {
          ...itemInCart,
          count: itemInCart.count - 1,
        });
      else {
        console.log("dec rem", index);
        state.currentCart.splice(index, 1);
      }
    }
  },
  [SET_ALL_CARD](state: CartStateType, cart: CartItemType[]) {
    console.log(SET_ALL_CARD);
    state.currentCart = cart;
  },
};

export default {
  mutations,
  actions,
  state,
  getters,
};
