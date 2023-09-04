<template>
  <a-form
    class="comment-form"
    :class="{
      small: props.commentType == 'children',
    }"
    @submit="onSubmit"
  >
    <div class="author">
      <div class="author-image">
        <nuxt-img
          v-if="isLogin && userAccount?.avatar"
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar')
              : userAccount?.avatar
          "
          loading="lazy"
        />

        <nuxt-img
          v-else
          :src="getImage(`user.png`, 'comment_avatar')"
          loading="lazy"
        />
      </div>
    </div>
    <div
      class="comment-input"
      :class="{
        focus: isFocus,
      }"
    >
      <a-textarea
        :id="'textarea-' + comment?.id"
        v-model:value="content"
        allowClear
        show-count
        :maxlength="3000"
        :autoSize="{ minRows: 1, maxRows: 10 }"
        placeholder="Viết bình luận..."
        @change="handleChange"
        @focus="handleFocus"
        @blur="isFocus = false"
      />

      <!-- <el-input
                v-model="comment"
                :maxlength="3000"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                placeholder="Please input"
              /> -->

      <div
        class="actions"
        :class="{
          active: isShowActions || showActions,
        }"
      >
        <div class="actions-container">
          <div class="left">
            <!-- <Icon name="ic:baseline-insert-emoticon" class="emoticon" /> -->

            <svg
              class="emoticon"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2rem"
              height="2.2rem"
              viewBox="0 0 24 24"
              @click="isShowEmoji = !isShowEmoji"
            >
              <path
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8S14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8S7 8.67 7 9.5S7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
              />
            </svg>

            <EmojiPicker
              :class="'emoji-picker-' + comment?.id"
              v-show="isShowEmoji"
              :native="true"
              :display-recent="true"
              :static-texts="{
                placeholder: 'Tìm kiếm biểu tượng cảm xúc',
              }"
              :hide-group-names="true"
              :disable-sticky-group-names="true"
              :disable-skin-tones="true"
              @select="onSelectEmoji"
            />
          </div>
          <div class="right">
            <a-button
              class="cancel click-active"
              type="text"
              @click="handleClickCanel"
            >
              Hủy
            </a-button>
            <a-button
              class="comment-btn click-active"
              type="text"
              html-type="submit"
              :disabled="disabledButton"
              :loading="loading"
            >
              {{ action == 'edit' ? 'Lưu' : 'Bình luận' }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getImage } from '~/services/image';
import { CommentMovie, EditComment } from '~/services/comment';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const props = defineProps({
  movieId: { type: String },
  parent: { type: Object },
  comment: { type: Object },
  movieType: { type: String },
  replyTo: { type: String, default: '' },
  commentType: { type: String, default: 'parent' },
  action: { type: String, default: 'post' },
  showActions: { type: Boolean, default: false },
  isShowFormComment: { type: Boolean, default: false },
});

const emits = defineEmits<{
  onClickCancel: [];
  onSuccessCommentChild: [data: any];
  onSuccessEditComment: [data: any];
}>();

const store = useStore();
const { isLogin, userAccount } = storeToRefs<any>(store);
const content = ref<string>('');
const isFocus = ref<boolean>(false);
const isShowActions = ref<boolean>(false);
const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const commentsList = defineModel<any[]>('commentsList');

onMounted(() => {
  // window.addEventListener('click', (e: any) => {
  //   if (
  //     !e.target.closest('.emoji-picker-' + props.comment?.id) &&
  //     !e.target.closest('.comment-form .actions-container .left .emoticon')
  //   ) {
  //     console.log(isShowEmoji.value);
  //     if (isShowEmoji.value) {
  //       isShowEmoji.value = false;
  //     }
  //   }
  // });
});

watch(props, () => {
  if (props.isShowFormComment) {
    const currentTextArea = document.getElementById(
      'textarea-' + props.comment?.id
    ) as HTMLTextAreaElement;

    setTimeout(() => {
      currentTextArea.focus();
    }, 10);
  }

  switch (props.action) {
    case 'post':
      content.value = '';
      break;
    case 'edit':
      content.value = props.comment?.content;
      break;
  }
});

const handleChange = (e: any) => {
  switch (props.action) {
    case 'post':
      disabledButton.value = content.value.length == 0;
      break;
    case 'edit':
      disabledButton.value =
        content.value.length == 0 || content.value == props.comment?.content;
      break;
  }
};

const handleFocus = () => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  isFocus.value = true;
  isShowActions.value = true;
};

const onSubmit = () => {
  loading.value = true;

  switch (props.action) {
    case 'post':
      CommentMovie({
        content: content.value,
        movieId: props.movieId,
        parentId: props.commentType == 'children' && props.parent?.id,
        movieType: props.movieType,
        commentType: props.commentType,
      })
        .then((response) => {
          if (response?.success) {
            if (props.commentType == 'parent') {
              commentsList.value?.unshift(response?.result);
            } else if (props.commentType == 'children') {
              emits('onClickCancel');
              emits('onSuccessCommentChild', response?.result);
            }

            content.value = '';
            disabledButton.value = true;
            isShowEmoji.value = false;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          setTimeout(() => {
            loading.value = false;
          }, 500);
        });
      break;
    case 'edit':
      EditComment({
        id: props.comment?.id,
        movieId: props.movieId,
        movieType: props.movieType,
        commentType: props.commentType,
        commentContent: content.value,
      })
        .then((response) => {
          if (response?.success) {
            ElNotification({
              title: 'Thành công!',
              message: 'Chỉnh sửa bình luận thành công.',
              type: 'success',
              position: 'bottom-right',
              duration: 3000,
            });

            content.value = '';
            disabledButton.value = true;
            isShowEmoji.value = false;

            emits('onSuccessEditComment', response?.content);
          }
        })
        .catch((e) => {
          ElNotification({
            title: 'Thất bại!',
            message: 'Chỉnh sửa bình luận thất bại',
            type: 'error',
            position: 'bottom-right',
            duration: 3000,
          });
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          loading.value = false;
        });
      break;
  }
};

const handleClickCanel = () => {
  isShowEmoji.value = false;
  isShowActions.value = false;
  content.value = '';
  emits('onClickCancel');
};

const onSelectEmoji = (emoji: any) => {
  // console.log(emoji);
  content.value += emoji.i;
  disabledButton.value = content.value.length == 0;
};
</script>

<style lang="scss" src="./FormComment.scss"></style>
