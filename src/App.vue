<template>
  <v-app style="background-color: #efefef;">
    <Header />
    <router-view />
  </v-app>
</template>

<style lang="scss"></style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Header from "@/components/header/Header.vue";
@Component({
  components: { Header },
})
export default class App extends Vue {}
</script>
