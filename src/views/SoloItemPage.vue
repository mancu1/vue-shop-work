<template>
  <div>
    <v-col>
      <v-row>
        <v-spacer />
        <v-card class="mt-12 d-flex flex-row" style="width: 85vw;" v-if="item">
          <div>
            <v-img
              height="400px"
              contain
              max-width="300"
              :src="item.image"
            ></v-img>
          </div>
          <div
            style="width: 100%;"
            class="d-flex flex-column justify-center text-center"
          >
            <v-card-title class="d-flex justify-center">
              {{ item.name }}
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              {{ item.price }} ₽
            </v-card-text>
            <v-card-subtitle class="d-flex justify-center">
              {{ item.description }}
            </v-card-subtitle>
            <v-card-actions class="d-flex flex-row">
              <div class="d-flex flex-row">
                <v-select
                  hide-details
                  :items="sizes"
                  v-model="size"
                  dense
                  outlined
                  label="размер"
                ></v-select>
              </div>
              <div
                v-if="currentCartItem"
                style="width: 100%;"
                class="d-flex flex-row justify-end"
              >
                <v-btn @click="dec" large outlined>
                  <v-icon>
                    mdi-minus
                  </v-icon>
                </v-btn>
                <div class="d-flex align-center justify-center pa-0 px-10">
                  {{ currentCartItem.count }}
                </div>
                <v-btn @click="inc" large outlined>
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
              <div
                v-else
                style="width: 100%;"
                class="d-flex flex-row justify-end pr-1"
              >
                <v-btn @click="inc" large outlined>
                  Добавить в корзину
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </v-card>
        <v-card v-else> </v-card>
        <v-spacer />
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ItemProductType } from "@/types/ItemProductType";
import {
  DEC_ITEM_TO_CART,
  INC_ITEM_TO_CART,
} from "@/store/modules/cartModule/action-types";
import { SET_ITEM_BY_ID } from "@/store/modules/itemsList/mutations-type";

@Component({
  name: "SoloItemPage",
})
export default class SoloItemPage extends Vue {
  get item(): ItemProductType | undefined {
    return (this.$store.getters.getAllItemsList as ItemProductType[]).find(
      (el) => el.id === this.$route.params.id
    );
  }

  sizes = [34, 35, 36];

  get size() {
    return this.item ? this.item.size : 34;
  }

  set size(newSize: 34 | 35 | 36) {
    this.$store.commit(SET_ITEM_BY_ID, { ...this.item, size: newSize });
  }

  get currentCartItem() {
    return this.item ? this.$store.getters.getCartItemById(this.item.id) : null;
  }

  inc() {
    this.$store.dispatch(INC_ITEM_TO_CART, this.item);
  }
  dec() {
    this.$store.dispatch(DEC_ITEM_TO_CART, this.item);
  }
}
</script>

<style scoped></style>
