<template>
  <v-col cols="12">
    <v-row>
      <v-spacer />
      <MainCarousel />

      <v-spacer />
    </v-row>
    <v-row>
      <div v-if="allItems" class="d-flex justify-center flex-wrap mx-12">
        <div class="ma-5" v-for="item in allItems" :key="item.id">
          <item-card :item="item" />
        </div>
      </div>
      <div v-else>
        <v-card> <v-card-title>Товаров нет</v-card-title></v-card>
      </div>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import MainCarousel from "@/components/MainCarousel.vue";
import ItemCard from "@/components/items/ItemCard.vue";
import { ItemProductType } from "@/types/ItemProductType";
import { Component, Vue } from "vue-property-decorator";
import { GET_ALL_ITEMS } from "@/store/modules/itemsList/actions-type";
@Component({
  name: "Home",
  components: { ItemCard, MainCarousel },
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch(GET_ALL_ITEMS);
  }

  get allItems(): ItemProductType[] {
    return this.$store.getters.getAllItemsList;
  }
  // item: ItemProductType = {
  //   name: "Игрушка",
  //   description:
  //     "С другой стороны укрепление и развитие структуры играет важную роль в формировании форм развития. Повседневная практика показывает, что укрепление и развитие структуры требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. Товарищи! рамки и место обучения кадров играет важную роль в формировании форм развития. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности позволяет выполнять важные задания по разработке дальнейших направлений развития.",
  //   image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
  //   id: "1",
  //   price: Math.round(Math.random() * 100 * 10),
  // };
}
</script>
