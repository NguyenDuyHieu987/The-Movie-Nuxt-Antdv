<template>
  <div class="pin-otp">
    <input
      v-model="pin[0]"
      type="text"
      maxlength="1"
      pattern="\d*"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[1]"
      type="text"
      maxlength="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[2]"
      type="text"
      maxlength="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[3]"
      type="text"
      maxlength="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[4]"
      type="text"
      maxlength="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[5]"
      type="text"
      maxlength="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{}>();
const pin = defineModel('pin', {
  type: Array,
  default: [null, null, null, null, null, null],
});

const handleImputPin = (e: any) => {
  e.target.addEventListener('keydown', (e1: any) => {
    if (e1.keyCode == 8 && e.target.previousElementSibling) {
      setTimeout(() => {
        e.target.previousElementSibling.focus();
      });
    }
  });
};

const handleKeyDownPin = (e: any) => {
  setTimeout(() => {
    if (e.keyCode != 8) {
      if (
        e.target.value.length > 0 &&
        e.target.nextElementSibling &&
        e.target.nextElementSibling.value.length == 0
      ) {
        setTimeout(() => {
          e.target.nextElementSibling.focus();
        });
      }
    }
  });
};

const handlePastePin = (e: any) => {};
</script>

<style lang="scss" src="./PinOTP.scss"></style>
