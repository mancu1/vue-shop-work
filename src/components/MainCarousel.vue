<template>
  <v-carousel
    class="mt-6"
    height="1280px"
    hide-delimiters
    cycle
    interval="5000"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "MainCarousel",
})
export default class MainCarousel extends Vue {
  items: { src: string }[] = [
    {
      src: "https://odezhda.guru/wp-content/uploads/2019/07/2-12.jpg",
    },
    {
      src:
        "https://i.pinimg.com/originals/68/7a/30/687a30394b7e3d58275d810e4a3c92a3.jpg",
    },
    {
      src: "https://profstylelux.ru/wp-content/uploads/2020/03/zh-fitnes.jpg",
    },
    {
      src:
        "https://c.wallhere.com/photos/03/b3/women_gyms_fitness_model_sportswear_sneakers_black_clothing_painted_nails-1510477.jpg!d",
    },
  ];

  a(text: string) {
    console.log(text);
  }
}
</script>

<style scoped></style>
