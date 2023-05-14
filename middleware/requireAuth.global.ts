import { useStore } from '@/store/useStore';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();

  if (to.name == 'follow' || to.name == 'history') {
    if (!store.$state.isLogin) {
      Modal.confirm({
        title: 'Bạn cần đăng nhập để sử dụng chức năng này.',
        icon: createVNode(QuestionCircleOutlined),
        content: createVNode('h3', {}, 'Đăng nhập ngay?'),
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        centered: true,
        onOk() {
          navigateTo({ path: '/login' });
        },
        onCancel() {
          navigateTo({ path: from.fullPath });
        },
      });
    } else {
      console.log(to.fullPath);
      navigateTo(to.fullPath);
    }
  }

  // to.matched.some((record) => {
  //   if (record.meta.requireAuth) {
  // if (!store.$state.isLogin) {
  //   Modal.confirm({
  //     title: 'Bạn cần đăng nhập để sử dụng chức năng này.',
  //     icon: createVNode(QuestionCircleOutlined),
  //     content: createVNode('h3', {}, 'Đăng nhập ngay?'),
  //     okText: 'Có',
  //     okType: 'primary',
  //     cancelText: 'Không',
  //     centered: true,
  //     onOk() {
  //       navigateTo('/login');
  //     },
  //     onCancel() {
  //       navigateTo({ path: from.fullPath });
  //     },
  //   });
  // } else {
  //   navigateTo({ path: to.fullPath });
  // }
  //   }
  // });
});
