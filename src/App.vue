<template>
  <Header />

  <main class="app-main">
    <router-view />
  </main>

  <BottomNav />
</template>

<script setup>
import Header from "@/components/global/Header.vue";
import BottomNav from "@/components/global/BottomNav.vue";
</script>
