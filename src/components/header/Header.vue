<template>
  <div>
    <v-app-bar color="#fff" dense fixed>
      <div>
        <v-btn large @click="$router.push('/')">
          интерактивного магазина для фабрики спортивной одежды

          <v-icon large color="red">
            mdi-heart
          </v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <div class="">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              :loading="0 < searchValue.length && searchValue.length < 3"
              :disabled="!allItems"
              flat
              hide-details
              dense
              outlined
              v-model="searchValue"
              v-on="on"
              label="Поиск"
            />
          </template>
          <v-list v-if="searchValue.length > 2">
            <v-list-item v-for="(item, index) in searchRes" :key="index">
              <v-btn large text style="width: 100%;" @click="goToItem(item)">
                <v-list-item-title>{{ item.name }} </v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer />
      <div class="d-flex flex-row">
        <div>
          <v-btn to="/cart" height="100%" x-large text>
            <v-badge
              :content="countCartItems"
              :value="countCartItems"
              color="green"
              overlap
              offset-y="15"
            >
              <v-icon color="primary" large>
                mdi-cart
              </v-icon>
            </v-badge>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CartItemType } from "@/types/CartItemType";
import { ItemProductType } from "@/types/ItemProductType";

@Component({
  name: "Header",
})
export default class Header extends Vue {
  searchValue = "";

  goToItem(item: ItemProductType) {
    this.searchValue = "";
    this.$router.push(`/item/${item.id}`);
  }

  get countCartItems() {
    return (this.$store.getters.getAllCart as CartItemType[]).reduce(
      (count, el) => {
        return (count += el.count);
      },
      0
    );
  }
  get allItems(): ItemProductType[] {
    return this.$store.getters.getAllItemsList;
  }

  get searchRes(): ItemProductType[] {
    return this.searchValue.length > 2
      ? this.allItems.reduce((arr: ItemProductType[], el) => {
          if (el.name.indexOf(this.searchValue) + 1) {
            arr.push(el);
          }
          return arr;
        }, [])
      : [];
  }
}
</script>

<style scoped></style>
