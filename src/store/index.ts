import Vue from "vue";
import Vuex from "vuex";
import itemsList, { ItemsListState } from "./modules/itemsList";
import cartModule, { CartStateType } from "./modules/cartModule";
import vuexPre from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { itemsList, cartModule },
  plugins: [vuexPre()],
});

export interface RootState {
  ItemsList: ItemsListState;
  cartModule: CartStateType;
}
