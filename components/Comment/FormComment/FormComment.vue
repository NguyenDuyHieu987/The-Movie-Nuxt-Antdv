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
          :src="getImage(`user2.png`, 'comment_avatar')"
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
            <Icon
              name="ic:baseline-insert-emoticon"
              class="emoticon"
              @click="isShowEmoji = !isShowEmoji"
            />
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
            <a-button class="cancel" type="text" @click="handleClickCanel">
              Hủy
            </a-button>
            <a-button
              class="comment-btn"
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
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
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
              showClose: false,
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
            showClose: false,
          });
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          setTimeout(() => {
            loading.value = false;
          }, 500);
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
