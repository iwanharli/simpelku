<template>
  <div :class="`content-inner pb-0 ${pageLayout}`" id="page_layout">
    <slot></slot>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    const pageLayout = computed(() => store.getters["setting/page_layout"])
    return {
      pageLayout
    }
  }
}
</script>

<style>
.content-inner {
  padding: 0px !important;
}

.containerPage {
  padding: 30px;
  overflow: auto;
  height: 990px;
  max-height: 990px;
}

.containerPage2 {
  padding: 30px 100px 30px 100px;
  overflow: auto;
  height: 990px;
  max-height: 990px;
}

/* For WebKit-based browsers (Chrome, Safari) */
.containerPage::-webkit-scrollbar {
  width: 10px;
}

.containerPage::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.containerPage::-webkit-scrollbar-thumb {
  background-color: #3c50a1;
  border-radius: 6px;
}

/* For Firefox */
.containerPage {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}

.containerPage2::-webkit-scrollbar {
  width: 10px;
}

.containerPage2::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.containerPage2::-webkit-scrollbar-thumb {
  background-color: #3c50a1;
  border-radius: 6px;
}

/* For Firefox */
.containerPage2 {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
</style>
