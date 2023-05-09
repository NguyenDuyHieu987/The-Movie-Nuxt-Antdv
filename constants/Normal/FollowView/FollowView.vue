<template>
  <div class="follow">
    <div v-if="isLogin" class="follow-container">
      <a-tabs v-model:activeKey="activeTabList">
        <a-tab-pane key="list" :tab="metaHead">
          <section
            v-if="dataList?.length"
            class="movie-group vertical"
            :class="{ collapse: $store.state.collapsed }"
          >
            <MovieCardVerticalFollow
              v-for="(item, index) in dataList"
              :index="index"
              :key="item.id"
              :item="item"
              :activeTabList="activeTabList"
              :getDataWhenRemoveList="getDataWhenRemoveList"
            /></section
        ></a-tab-pane>
        <a-tab-pane key="history" tab="Lịch sử xem phim">
          <section
            v-if="dataHistory?.length"
            class="movie-group"
            :class="{ collapse: $store.state.collapsed }"
          >
            <MovieCardVerticalFollow
              v-for="(item, index) in dataHistory"
              :index="index"
              :key="item.id"
              :item="item"
              :activeTabList="activeTabList"
              :getDataWhenRemoveHistory="getDataWhenRemoveHistory"
            />
          </section>
        </a-tab-pane>
      </a-tabs>

      <!-- <a-layout>
        <a-layout-content>
          <h2 class="gradient-title-default" style="margin-top: 0px">
            <strong>{{ metaHead }}</strong>
          </h2>
        </a-layout-content>

        <a-layout-sider :width="300">
          <h2 class="gradient-title-default" style="margin-top: 0px">
            <strong>Lịch sử xem phim</strong>
          </h2>
        </a-layout-sider>
      </a-layout> -->
    </div>

    <a-result v-else title="Bạn cần đăng nhập để sử dụng chức năng này">
      <template #extra>
        <a-button
          key="console"
          size="large"
          @click="$router.push({ path: '/login' })"
          >Đăng nhập ngay
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import { watch, onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MovieCardVerticalFollow from '@/components/Normal/MovieCardVerticalFollow/MovieCardVerticalFollow.vue';
import { getList, getWatchList } from '@/services/MovieService';
import { useMeta } from 'vue-meta';

export default {
  components: { MovieCardVerticalFollow },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isLogin = computed(() => store.state.isLogin);
    const metaHead = ref('Theo dõi');
    const dataList = ref([]);
    const dataHistory = ref([]);
    const activeTabList = ref('list');

    // document.title = 'Phimhay247 - Theo dõi';
    useMeta({
      title: '`Phimhay247 - Theo dõi',
      htmlAttrs: { lang: 'vi', amp: true },
    });

    const getData = () => {
      getList(store?.state.userAccount?.id)
        .then((movieRespone) => {
          dataList.value = movieRespone.data?.items;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      getWatchList(store?.state.userAccount?.id, 1)
        .then((movieRespone) => {
          dataHistory.value = movieRespone.data?.results;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    };

    onBeforeMount(() => {
      // if (!store.state.isLogin) {
      //   Modal.confirm({
      //     title: 'Bạn cần đăng nhập để sử dụng chức năng này.',
      //     icon: createVNode(QuestionCircleOutlined),
      //     // content: createVNode('div', 'Bạn có muốn đăng nhập không?'),
      //     content: createVNode('div', {}, 'Đăng nhập ngay?'),
      //     okText: 'Có',
      //     okType: 'default',
      //     cancelText: 'Không',
      //     onOk() {
      //       router.push({ path: '/login' });
      //     },
      //     onCancel() {},
      //     class: 'require-login-confirm',
      //   });
      // }

      getData();
    });

    const getDataWhenRemoveList = (data) => {
      dataList.value = data;
    };

    const getDataWhenRemoveHistory = (data) => {
      dataHistory.value = data;
    };

    watch(route, () => {
      // getData();
    });

    return {
      isLogin,
      metaHead,
      dataList,
      dataHistory,
      activeTabList,
      getData,
      getDataWhenRemoveList,
      getDataWhenRemoveHistory,
    };
  },
  // beforeRouteEnter() {
  //   alert('g');
  // },
};
</script>

<style lang="scss" src="./FollowView.scss"></style>
