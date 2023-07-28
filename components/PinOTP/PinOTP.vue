<template>
  <div class="pin-otp">
    <input
      v-model="pin[0]"
      type="number"
      :maxlength="1"
      :index="1"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[1]"
      type="number"
      :maxlength="1"
      :index="2"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[2]"
      type="number"
      :maxlength="1"
      :index="3"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[3]"
      type="number"
      :maxlength="1"
      :index="4"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[4]"
      type="number"
      :maxlength="1"
      :index="5"
      @keydown="handleKeyDownPin"
      @input="handleImputPin"
      @paste="handlePastePin"
    />

    <input
      v-model="pin[5]"
      type="number"
      :maxlength="1"
      :index="6"
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

onMounted(() => {
  document.querySelectorAll('input[type="number"]').forEach((input: any) => {
    input.oninput = (e: any) => {
      if (
        input.value.length >= +input.getAttribute('maxlength') &&
        !isNaN(input.value)
      ) {
        input.value = input.value.slice(0, +input.getAttribute('maxlength'));
      }
    };
  });
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
      if (isNaN(e.target.value)) {
        // e.target.type = 'number';
      } else if (
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

const handlePastePin = (e: any) => {
  setTimeout(() => {
    const index = +e.target.getAttribute('index');

    let k = 0;

    for (let i = index - 1; i < pin.value.length; i++) {
      pin.value[i] = e.target.value[k++];
    }
  });
};
</script>

<style lang="scss" src="./PinOTP.scss"></style>
