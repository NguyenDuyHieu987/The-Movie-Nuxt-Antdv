<template>
  <div
    class="loading-spinner"
    :class="class"
    :style="{
      '--width': width + 'px',
    }"
  >
    <div class="ytp-spinner" data-layer="4">
      <div>
        <div class="ytp-spinner-container">
          <div class="ytp-spinner-rotator">
            <div class="ytp-spinner-left">
              <div class="ytp-spinner-circle"></div>
            </div>
            <div class="ytp-spinner-right">
              <div class="ytp-spinner-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  class: { type: String },
  width: { type: Number, default: 50 },
});
</script>

<style lang="scss" src="./LoadingSpinner.scss" scoped></style>
