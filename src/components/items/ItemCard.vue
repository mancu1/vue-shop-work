<template>
  <v-card
    class="d-flex flex-column rounded-card align-content-space-between"
    height="400"
    width="300"
  >
    <div style="height: inherit;" v-ripple @click="goToItem">
      <div class="pa-3"><v-img height="110" :src="item.image" /></div>
      <v-card-title>
        {{ item.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ item.description.slice(0, 75) + "..." }}
      </v-card-subtitle>
      <v-card-text>
        {{ item.price + " ₽" }}
      </v-card-text>
    </div>
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
import { SET_ITEM_BY_ID } from "@/store/modules/itemsList/mutations-type";

@Component({
  name: "ItemCard",
})
export default class ItemCard extends Vue {
  @Prop({ type: Object, required: true }) item!: ItemProductType;

  sizes = [34, 35, 36];

  get size() {
    return this.item.size;
  }

  set size(newSize: 34 | 35 | 36) {
    this.$store.commit(SET_ITEM_BY_ID, { ...this.item, size: newSize });
  }

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

<style scoped>
.rounded-card {
  border-radius: 50px;
}
</style>
