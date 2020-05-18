<template>
  <div>
    <v-col>
      <v-row>
        <v-spacer />
        <v-card class="mt-12" style="width: 85vw;" v-if="item">
          <div>
            <v-img :src="item.image"></v-img>
          </div>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-text>
            {{ item.price }}
          </v-card-text>
          <v-card-subtitle>
            {{ item.description }}
          </v-card-subtitle>
          <v-card-actions>
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

@Component({
  name: "SoloItemPage",
})
export default class SoloItemPage extends Vue {
  get item(): ItemProductType | undefined {
    return (this.$store.getters.getAllItemsList as ItemProductType[]).find(
      (el) => el.id === this.$route.params.id
    );
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
