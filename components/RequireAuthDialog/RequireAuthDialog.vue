<template>
  <div>
    <el-dialog
      class="require-auth-dialog"
      v-model="store.$state.openRequireAuthDialog"
      width="30%"
      align-center
      center
      append-to-body
      :show-close="false"
    >
      <template #header>
        <CloseBtn
          class="transparent"
          @click="store.setCloseRequireAuthDialog()"
        />
      </template>

      <a-result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
      </a-result>

      <template #footer>
        <NuxtLink
          :to="{ path: '/signup' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <DefaultButton> Đăng ký </DefaultButton>
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/login' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <GradientButton> Đăng nhập </GradientButton>
        </NuxtLink>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import GradientButton from '@/components/button/GradientButton/GradientButton.vue';
import DefaultButton from '@/components/button/DefaultButton/DefaultButton.vue';
import CloseBtn from '@/components/button/CloseBtn/CloseBtn.vue';

const store = useStore();
</script>

<style lang="scss" src="./RequireAuthDialog.scss"></style>
