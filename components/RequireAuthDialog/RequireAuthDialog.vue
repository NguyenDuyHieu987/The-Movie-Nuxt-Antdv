<template>
  <Teleport v-if="store.$state.openRequireAuthDialog" to="body">
    <!-- <el-dialog
      class="require-auth-dialog"
      v-model="store.$state.openRequireAuthDialog"
      width="30%"
      align-center
      center
      append-to-body
      destroy-on-close
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
          <a-button type="text" size="large" class="default">
            Đăng ký
          </a-button>
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/login' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <a-button type="text" size="large" class="default gradient">
            Đăng nhập
          </a-button>
        </NuxtLink>
      </template>
    </el-dialog> -->

    <a-modal
      class="require-auth-dialog"
      v-model:visible="store.$state.openRequireAuthDialog"
      width="30%"
      centered
      destroyOnClose
      :closable="true"
    >
      <template #closeIcon>
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
          <a-button type="text" size="large" class="default">
            Đăng ký
          </a-button>
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/login' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <a-button type="text" size="large" class="default gradient">
            Đăng nhập
          </a-button>
        </NuxtLink>
      </template>
    </a-modal>
  </Teleport>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/button/CloseBtn/CloseBtn.vue';

const store = useStore();
</script>

<style lang="scss" src="./RequireAuthDialog.scss"></style>
