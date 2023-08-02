<template>
  <Teleport v-if="store.openRequireAuthDialog" to="body">
    <!-- <el-dialog
      class="require-auth-dialog"
      v-model="store.openRequireAuthDialog"
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

      <Result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
      </Result>

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

    <Modal
      class="require-auth-dialog"
      v-model:open="store.openRequireAuthDialog"
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

      <Result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
      </Result>

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
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { Modal, Result } from 'ant-design-vue';
import CloseBtn from '~/components/ButtonTemplate/CloseBtn';

const store = useStore();
</script>

<style lang="scss" src="./RequireAuthDialog.scss"></style>
