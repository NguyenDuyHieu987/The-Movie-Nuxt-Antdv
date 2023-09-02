<template>
  <div class="comment-item-child">
    <div class="comment-item-child-container">
      <div class="author">
        <div class="author-image">
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+item?.user_avatar)
                ? getImage(`account${item?.user_avatar}.jpg`, 'user_avatar')
                : item?.user_avatar
            "
            loading="lazy"
          />
        </div>
      </div>
      <div class="right-side">
        <div class="top">
          <span class="author-username">{{ item?.username }}</span>
          <span class="created-at">
            {{ utils.dateFormater.fromNow(item?.created_at) }}
          </span>
          <span v-if="isUpdated" class="updated-text"> (Đã chỉnh sửa) </span>
        </div>

        <p class="content">{{ commentContent }}</p>

        <div class="actions">
          <LikeDislike :comment="item" />

          <a-button
            class="reply click-active"
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
          :parent="parent"
          :comment="item"
          :isShowFormComment="isShowFormComment"
          commentType="children"
          :action="commentAction"
          :replyTo="item?.username"
          @onClickCancel="isShowFormComment = false"
          @onSuccessCommentChild="handleSuccessCommentChild"
          @onSuccessEditComment="handleSuccessEditComment"
        />
      </div>

      <div class="more-actions">
        <a-dropdown
          v-if="userAccount?.id == item?.user_id"
          :trigger="['click']"
          placement="bottomRight"
          overlayClassName="dropdown-item-viewmore"
          class="dropdown-item-viewmore"
        >
          <a-button size="large" type="text" class="more-actions-btn">
            <template #icon>
              <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 512 512"
              >
                <circle cx="256" cy="256" r="48" fill="currentColor" />
                <circle cx="256" cy="416" r="48" fill="currentColor" />
                <circle cx="256" cy="96" r="48" fill="currentColor" />
              </svg>
            </template>
          </a-button>

          <template #overlay>
            <a-menu>
              <div class="main-action">
                <a-menu-item
                  key="edit-comment"
                  class="remove-item"
                  @click="handleEditComment"
                >
                  <template #icon>
                    <!-- <Icon name="ic:outline-edit" /> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
                      />
                    </svg>
                  </template>
                  <span>Chỉnh sửa</span>
                </a-menu-item>
              </div>

              <hr />

              <div class="danger-zone">
                <a-menu-item
                  key="remove-comment"
                  class="remove-item"
                  @click="handleRemoveComment"
                >
                  <template #icon>
                    <!-- <Icon name="fa6-solid:trash-can" /> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                      />
                    </svg>
                  </template>
                  <span>Xóa bình luận</span>
                </a-menu-item>
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { DeleteComment } from '~/services/comment';
import { getImage } from '~/services/image';
import FormComment from '~/components/Comment/FormComment/FormComment.vue';
import LikeDislike from '~/components/Comment/LikeDislike/LikeDislike.vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
  item: any;
  movieId: string;
  parent: any;
  movieType: string;
}>();

const emits = defineEmits<{
  onSuccessCommentChild: [data: any];
  omSuccessRemoveCommentChild: [];
}>();

const utils = useUtils();
const store = useStore();
const { userAccount } = storeToRefs<any>(store);
const listReplies = defineModel<any[]>('listReplies');
const isShowFormComment = ref<boolean>(false);
const commentAction = ref<string>('post');
const commentContent = ref<string>(props.item?.content);
const isUpdated = ref<boolean>(props.item?.isUpdated);

onBeforeMount(() => {});

const handleSuccessCommentChild = (data: any) => {
  emits('onSuccessCommentChild', data);
};

const handleEditComment = () => {
  isShowFormComment.value = !isShowFormComment.value;
  if (isShowFormComment.value) {
    commentAction.value = 'edit';
    commentContent.value = props.item?.content;
  }
};

const handleSuccessEditComment = (data: string) => {
  isUpdated.value = true;
  isShowFormComment.value = false;
  commentContent.value = data;
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
      if (response?.success) {
        listReplies.value = _.reject(listReplies.value, (x) => {
          return x.id === props.item?.id;
        });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa bình luận thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });

        emits('omSuccessRemoveCommentChild');
      }
    })
    .catch((e) => {
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa bình luận thất bại',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {});
};
</script>

<style lang="scss" src="./CommentItemChild.scss"></style>
