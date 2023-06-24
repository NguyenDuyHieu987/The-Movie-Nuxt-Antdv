<template>
  <a-form class="comment-form" @submit="onSubmit">
    <div class="author">
      <div class="author-image">
        <nuxt-img
          v-if="isLogin && userAccount?.avatar"
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? `/images/account_avatar/account${userAccount?.avatar}.jpg`
              : userAccount?.avatar
          "
          loading="lazy"
        />

        <nuxt-img v-else src="/images/users/user2.png" loading="lazy" />
      </div>
    </div>
    <div
      class="comment-input"
      :class="{
        focus: isFocus,
      }"
    >
      <a-textarea
        :id="comment?.id"
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
              Bình luận
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CommentMovie } from '~/services/comment';
import { storeToRefs } from 'pinia';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const props = defineProps({
  movieId: { type: String },
  comment: { type: Object },
  movieType: { type: String },
  contentComment: { type: String, default: '' },
  commentType: { type: String, default: 'parent' },
  showActions: { type: Boolean, default: false },
  isShowFormComment: { type: Boolean, default: false },
});

const emits = defineEmits<{
  onClickCancel: [];
  onSuccessCommentChild: [data: any];
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

onBeforeMount(() => {});

watch(props, () => {
  if (props.isShowFormComment) {
    const currentTextArea = document.getElementById(
      props.comment?.id
    ) as HTMLTextAreaElement;

    setTimeout(() => {
      currentTextArea.focus();
    }, 10);
  }
});

const handleChange = (e: any) => {
  disabledButton.value = content.value.length == 0;
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
  CommentMovie({
    content: content.value,
    movieId: props.movieId,
    parentId: props.commentType == 'children' && props.comment?.id,
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
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      content.value = '';
      loading.value = false;
      disabledButton.value = true;
      isShowEmoji.value = false;
    });
};

const handleClickCanel = () => {
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
