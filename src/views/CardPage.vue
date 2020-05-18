<template>
  <div>
    <v-col>
      <v-row>
        <v-spacer />
        <h2>
          Корзина
        </h2>
        <v-spacer />
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-spacer />
        <v-card width="85%">
          <div
            class="d-flex flex-column align-center justify-center my-4 mx-auto"
          >
            <v-card-title>
              Корзина
            </v-card-title>
          </div>
          <div
            class="d-flex flex-row justify-space-around pa-1"
            v-for="cartItem in fullCard"
            :key="cartItem.id"
          >
            <div>
              <v-img width="80" height="80" :src="cartItem.image"></v-img>
            </div>
            <div
              class="text--accent-1 d-flex align-center justify-center text-center"
            >
              {{ cartItem.name }} -
              {{ `${cartItem.count * cartItem.price} ₽ ` }} - размер
              {{ cartItem.size }}
            </div>

            <div class="d-flex align-center flex-row">
              <v-btn @click="dec(cartItem)" large outlined>
                <v-icon>
                  mdi-minus
                </v-icon>
              </v-btn>
              <div class="d-flex align-center justify-center py-0 px-4">
                {{ cartItem.count }}
              </div>
              <v-btn @click="inc(cartItem)" large outlined>
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </div>

          <div v-if="fullCard.length" class="d-flex flex-row justify-end">
            <div class="d-flex align-center justify-center">
              <v-card-title class="d-flex align-center justify-center">
                {{ totalPrise + " руб. " }}
              </v-card-title>
            </div>
            <div class="pr-6 d-flex align-center justify-center">
              <v-btn @click="buy" color="success">
                Купить
              </v-btn>
            </div>
          </div>
          <div
            v-else
            class="d-flex flex-column align-center justify-center my-12 mx-auto"
          >
            <v-card-title>
              Пока пусто заходите позже когда найдете что-то для себя
            </v-card-title>
            <div>
              <v-btn to="/" large color="error">
                Назад!
              </v-btn>
            </div>
          </div>
        </v-card>
        <v-spacer />
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CartItemType } from "@/types/CartItemType";
import {
  DEC_ITEM_TO_CART,
  EDIT_ALL_CARD,
  INC_ITEM_TO_CART,
} from "@/store/modules/cartModule/action-types";
import CardToPdf from "@/helper/CardToPdf";
import { SET_ITEM_BY_ID } from "@/store/modules/itemsList/mutations-type";

@Component({
  name: "CardPage",
})
export default class CardPage extends Vue {
  get fullCard(): CartItemType[] {
    return this.$store.getters.getAllCart;
  }
  get totalPrise() {
    return this.fullCard.reduce((total, el) => {
      return total + el.price * el.count;
    }, 0);
  }

  inc(item: CartItemType) {
    this.$store.dispatch(INC_ITEM_TO_CART, item);
  }
  dec(item: CartItemType) {
    this.$store.dispatch(DEC_ITEM_TO_CART, item);
  }

  buy() {
    CardToPdf(this.fullCard);
    this.$store.dispatch(EDIT_ALL_CARD, []);
    this.$router.push("/");
  }
}
</script>

<style scoped></style>
