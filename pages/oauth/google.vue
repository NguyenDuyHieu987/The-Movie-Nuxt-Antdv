<template>
  <!-- <div class="oauth padding-content"></div> -->
</template>

<script setup lang="ts">
import axios from 'axios';
import { loginGoogle } from '~/services/authentication';
import { ElNotification } from 'element-plus';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

definePageMeta({
  layout: 'oauth',
});

const utils = useUtils();
const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;
  store.loadingAppInstance.start();

  const url = window.location.href;

  const access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)?.at(1);

  loginGoogle({
    accessToken: access_token,
  })
    .then((response: any) => {
      if (response.isSignUp == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',
          showClose: false,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });

        store.userAccount = response?.result;
        store.isLogin = true;
        utils.localStorage.setWithExpiry(
          'userAccount',
          {
            user_token: response.headers.get('Authorization'),
          },
          30
        );
        navigateTo({ path: '/' });
        // navigateTo({ path: urlBack.value });
      } else if (response.isLogin == true) {
        store.userAccount = response?.result;
        store.isLogin = true;
        utils.localStorage.setWithExpiry(
          'userAccount',
          {
            user_token: response.headers.get('Authorization'),
          },
          30
        );
        navigateTo({ path: '/' });
        // navigateTo({ path: urlBack.value });
      } else if (response.isLogin == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Some thing went wrong.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: 'Thất bại!',
        message: 'Some thing went wrong.',
        showClose: false,
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;

      setTimeout(() => {
        store.loadingAppInstance.finish();
      }, 300);
    });
});

watch(route, () => {}, {
  deep: true,
  immediate: true,
});
</script>
