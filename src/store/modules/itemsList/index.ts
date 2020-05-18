import { ItemProductType } from "@/types/ItemProductType";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import axios from "axios";
import { GET_ALL_ITEMS } from "@/store/modules/itemsList/actions-type";
import { SET_ALL_LIST } from "@/store/modules/itemsList/mutations-type";

export interface ItemsListState {
  listItems: ItemProductType[];
}

const state: ItemsListState = {
  listItems: [],
};

const getters = {
  getAllItemsList: (state: ItemsListState) => state.listItems,
};
const actions = {
  [GET_ALL_ITEMS](context: ActionContext<ItemsListState, RootState>) {
    axios.get("/api/products/").then((result) => {
      context.commit(SET_ALL_LIST, result.data.products);
    });
  },
};

const mutations = {
  [SET_ALL_LIST](state: ItemsListState, list: ItemProductType[]) {
    state.listItems = list;
  },
};

export default {
  mutations,
  actions,
  state,
  getters,
};
