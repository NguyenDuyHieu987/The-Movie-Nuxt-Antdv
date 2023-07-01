<template>
  <a-drawer
    class="menu-drawer"
    v-model:visible="openDrawer"
    placement="left"
    :closable="false"
  >
    <template #title>
      <div class="user-header">
        <div class="user-image-container" v-if="!collapsed && isLogin">
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+userAccount?.avatar)
                ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar')
                : userAccount?.avatar
            "
            alt=""
          />
        </div>

        <h4>
          {{ userAccount?.username }}
        </h4>
      </div>
    </template>
    <TheMenu />
  </a-drawer>

  <!-- <ClientOnly>
    <el-drawer
      class="menu-drawer"
      v-model="openDrawer"
      direction="ltr"
      placement="left"
      :show-close="false"
    >
      <template #header>
        <div class="user-header">
          <div class="user-image-container" v-if="!collapsed && isLogin">
            <nuxt-img
              class="avatar"
              :src="
                !isNaN(+userAccount?.avatar)
                  ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar')
                  : userAccount?.avatar
              "
              alt=""
            />
          </div>

          <h4>
            {{ userAccount?.username }}
          </h4>
        </div>
      </template>
      <TheMenu />
    </el-drawer>
  </ClientOnly> -->
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import TheMenu from '@/components/TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, openDrawer, userAccount } = storeToRefs<any>(store);

onMounted(() => {
  window.onresize = () => {
    if (window.innerWidth > 900) {
      store.$state.openDrawer = false;
    }
  };
});
</script>

<style lang="scss" src="./Drawer.scss"></style>
