<template>
  <default-navbar>
    <!-- SIDEBAR  -->
    <SidebarComponent />

    <!-- MENU  -->
    <MenuComponent />
  </default-navbar>
</template>

<script setup>
import DefaultNavbar from "@/components/partials/custom/DefaultNavbar.vue"
import SidebarComponent from "@/components/partials/SidebarComponent.vue"
import MenuComponent from "@/components/partials/MenuComponent.vue"
</script>

<style>
.active {
  background: rgb(255, 255, 255) !important;
  color: #3a57e8 !important;
  /* font-weight: bolder; */
}
</style>
