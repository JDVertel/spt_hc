<template>
  <div class="accordion-flush accordion" :id="config.id">
    <div v-for="item in config.items" :key="item.id" class="accordion-item">
      <h2 class="accordion-header d-flex justify-content-between">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${item.id}`"
          aria-expanded="false"
          :aria-controls="item.id"
        >
          {{ item.title }}
        </button>
      </h2>
      <div
        :id="item.id"
        class="accordion-collapse collapse"
        :data-bs-parent="`#${config.id}`"
      >
        <div class="accordion-body" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { accordionConfig } from "../../bd/bd.js";

export default {
  name: "AppAccordion",
  data() {
    return {
      config: accordionConfig,
    };
  },
};
</script>
