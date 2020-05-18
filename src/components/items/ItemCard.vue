<template>
  <v-card
    class="d-flex flex-column align-content-space-between"
    tile
    height="350"
    width="300"
  >
    <div style="height: inherit;" v-ripple @click="goToItem">
      <div class="pa-1"><v-img height="110" :src="item.image" /></div>
      <v-card-title>
        {{ item.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ item.description.slice(0, 75) + "..." }}
      </v-card-subtitle>
      <v-card-text>
        {{ item.price + " руб." }}
      </v-card-text>
    </div>
    <v-card-actions>
      <div
        v-if="currentCartItem"
        style="width: 100%;"
        class="d-flex flex-row justify-space-around"
      >
        <v-btn @click="dec" large outlined>
          <v-icon>
            mdi-minus
          </v-icon>
        </v-btn>
        <div class="d-flex align-center justify-center pa-0">
          {{ currentCartItem.count }}
        </div>
        <v-btn @click="inc" large outlined>
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
      <div v-else style="width: 100%;" class="d-flex flex-row justify-end pr-1">
        <v-btn @click="inc" large outlined>
          Добавить в корзину
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ItemProductType } from "@/types/ItemProductType";
import {
  DEC_ITEM_TO_CART,
  INC_ITEM_TO_CART,
} from "@/store/modules/cartModule/action-types";
import { CartItemType } from "@/types/CartItemType";

@Component({
  name: "ItemCard",
})
export default class ItemCard extends Vue {
  @Prop({ type: Object, required: true }) item!: ItemProductType;

  goToItem() {
    this.$router.push(`/item/${this.item.id}`);
  }

  get currentCartItem() {
    return this.$store.getters.getCartItemById(this.item.id);
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
