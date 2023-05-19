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
        <Icon
          name="ic:twotone-close"
          class="close"
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

<script setup>
import GradientButton from '@/components/button/GradientButton';
import DefaultButton from '@/components/button/DefaultButton';

const store = useStore();
</script>

<style lang="scss" src="./RequireAuthDialog.scss"></style>
