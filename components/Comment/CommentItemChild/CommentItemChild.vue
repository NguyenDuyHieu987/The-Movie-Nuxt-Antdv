<template>
  <div class="comment-item-child">
    <div class="comment-item-child-container">
      <div class="author">
        <div class="author-image">
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+item?.user_avatar)
                ? `/images/account_avatar/account${item?.user_avatar}.jpg`
                : item?.user_avatar
            "
            loading="lazy"
          />
        </div>
      </div>
      <div class="right-side">
        <div class="top">
          <span class="author-username">{{ item?.username }}</span>
          <span class="created-at">{{
            moment(item?.created_at).locale('vi').fromNow()
          }}</span>
        </div>

        <p class="content">{{ item?.content }}</p>

        <div class="actions">
          <div class="like-dislike">
            <Icon name="ph:thumbs-up" />
            <Icon name="ph:thumbs-down" />
          </div>

          <a-button
            class="reply"
            type="text"
            @click="isShowFormComment = !isShowFormComment"
          >
            <!-- :disabled="userAccount?.id == item?.user_id" -->
            Phản hồi
          </a-button>
        </div>

        <FormComment
          v-show="isShowFormComment"
          v-model:listReplies="listReplies"
          :movieId="movieId"
          :movieType="movieType"
          :showActions="true"
          :comment="item"
          :isShowFormComment="isShowFormComment"
          commentType="children"
          :contentComment="item?.username"
          @onClickCancel="isShowFormComment = false"
          @onSuccessCommentChild="handleSuccessCommentChild"
        />
      </div>
    </div>

    <div class="more-actions">
      <a-dropdown
        v-if="userAccount?.id == item?.user_id"
        :trigger="['click']"
        placement="bottomRight"
        overlayClassName="dropdown-item-viewmore"
        class="dropdown-item-viewmore"
      >
        <el-button
          circle
          shape="circle"
          size="large"
          class="more-actions-btn"
          text
        >
          <template #icon>
            <Icon name="fa6-solid:ellipsis-vertical" />
          </template>
        </el-button>

        <template #overlay>
          <a-menu>
            <!-- <div class="main-action"></div>
            <hr /> -->

            <div class="danger-zone">
              <a-menu-item
                key="remove-comment"
                class="remove-item"
                @click="handleRemoveComment"
              >
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </template>
                <span>Xóa bình luận</span>
              </a-menu-item>
            </div>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { DeleteComment } from '~/services/comment';
import FormComment from '@/components/Comment/FormComment/FormComment.vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { ElNotification } from 'element-plus';

const props = defineProps<{
  item: any;
  movieId: string;
  parent: any;
  movieType: string;
}>();

const emits = defineEmits<{
  onSuccessCommentChild: [data: any];
}>();

const store = useStore();
const { userAccount } = storeToRefs<any>(store);
const listReplies = defineModel<any[]>('listReplies');
const isShowFormComment = ref<boolean>(false);

onBeforeMount(() => {});

const handleSuccessCommentChild = (data: any) => {
  emits('onSuccessCommentChild', data);
};

const handleRemoveComment = () => {
  DeleteComment({
    id: props.item?.id,
    movieId: props.movieId,
    parentId: props.parent?.id,
    movieType: props.movieType,
    commentType: 'children',
  })
    .then((response) => {
      ElNotification({
        title: 'Thành công!',
        message: 'Xóa bình luận thành công.',
        type: 'success',
        position: 'bottom-right',
        duration: 3000,
        showClose: false,
      });

      if (response?.success) {
        listReplies.value = _.reject(listReplies.value, (x) => {
          return x.id === props.item?.id;
        });
      }
    })
    .catch((e) => {
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa bình luận thất bại',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
        showClose: false,
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {});
};
</script>

<style lang="scss" src="./CommentItemChild.scss"></style>
