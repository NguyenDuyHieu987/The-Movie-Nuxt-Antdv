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
        <NuxtImg
          v-if="isLogin && userAccount?.avatar && !store.loadingUser"
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? getImage(
                  `account${userAccount?.avatar}.jpg`,
                  'user_avatar',
                  'w-50'
                )
              : userAccount?.avatar
          "
          loading="lazy"
          alt=""
        />

        <NuxtImg
          v-else
          :src="getImage(`user.png`, 'comment_avatar')"
          loading="lazy"
          alt=""
        />
      </div>
    </div>
    <div
      class="comment-input"
      :class="{
        focus: isFocus,
      }"
    >
      <div class="contenteditable-input-field">
        <div
          ref="contenteditableInputField"
          id="contenteditable-root"
          :class="{updated: contenteditableInputField!?.innerText.length != 0}"
          contenteditable
          @change="handleChange"
          @input="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        ></div>
      </div>

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
                fill="currentColor"
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8S14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8S7 8.67 7 9.5S7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
              />
            </svg>

            <ClientOnly>
              <EmojiPicker
                v-if="isShowEmoji"
                :class="'emoji-picker-' + comment?.id"
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
            </ClientOnly>
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
import type { commentForm } from '~/types';
import DOMPurify from 'dompurify';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

// const props = defineProps({
//   movieId: { type: String },
//   movieType: { type: String },
//   parent: { type: commentForm },
//   comment: { type: commentForm },
//   replyTo: { type: commentForm },
//   commentType: { type: String, default: 'parent' },
//   action: { type: String, default: 'post' },
//   showActions: { type: Boolean, default: false },
//   isShowFormComment: { type: Boolean, default: false },
// });

const props = withDefaults(
  defineProps<{
    movieId?: string;
    movieType?: string;
    parent?: commentForm;
    comment?: commentForm;
    replyTo?: commentForm;
    commentType?: string;
    action?: 'post' | 'edit' | string;
    showActions?: boolean;
    isShowFormComment?: boolean;
  }>(),
  {
    commentType: 'parent',
    action: 'post',
    showActions: false,
    isShowFormComment: false,
  }
);

const emits = defineEmits<{
  onClickCancel: [];
  onSuccessCommentChild: [data: commentForm];
  onSuccessEditComment: [data: string];
}>();

const store = useStore();
const { isLogin, userAccount } = storeToRefs<any>(store);
const contenteditableInputField = ref<HTMLDivElement>();
const content = ref<string>('');
const isFocus = ref<boolean>(false);
const isShowActions = ref<boolean>(false);
const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const commentsList = defineModel<commentForm[]>('commentsList');
const commentContent = defineModel<string>('commentContent', { default: '' });
const sanitizedHtmlComment = ref<string>(
  props.commentType == 'children' && props?.replyTo
    ? DOMPurify.sanitize(
        `<span class="reply-to">@${props.replyTo!.username}&nbsp;</span>`,
        { USE_PROFILES: { html: true } }
      )
    : ''
);
const replyToFirstEl = computed<string>(() =>
  DOMPurify.sanitize(
    `<span class="reply-to">@${props.replyTo!.username}&nbsp;</span>`,
    {
      USE_PROFILES: { html: true },
    }
  )
);

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

watchEffect(() => {
  if (props.isShowFormComment) {
    switch (props.action) {
      case 'post':
        if (contenteditableInputField.value) {
          contenteditableInputField.value!.innerHTML = '';
        }
        break;
      case 'edit':
        contenteditableInputField.value!.innerHTML = commentContent.value;
        break;
    }

    if (props.commentType == 'children' && props?.replyTo) {
      contenteditableInputField.value!.insertAdjacentHTML(
        'afterbegin',
        replyToFirstEl.value
      );

      const replyToEl = contenteditableInputField.value?.querySelector(
        '.reply-to'
      ) as HTMLElement;
      replyToEl.setAttribute('contenteditable', 'false');
    }

    setTimeout(() => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contenteditableInputField.value!);
      range.collapse(false);
      selection!.removeAllRanges();
      selection!.addRange(range);

      contenteditableInputField.value!.focus();
    }, 10);
  }
});

const handleChange = (e: any) => {
  // e.preventDefault();

  if (contenteditableInputField.value!?.innerText.length >= 3000) {
    contenteditableInputField.value!.innerHTML =
      contenteditableInputField.value!.innerHTML.slice(0, 3000);
    return e.preventDefault();
  }

  if (props.commentType == 'children' && props?.replyTo) {
    if (
      e.inputType == 'deleteContentBackward' ||
      e.inputType == 'deleteContentForward'
    ) {
      const replyToEl = contenteditableInputField.value?.querySelector(
        '.reply-to'
      ) as HTMLElement;

      if (
        replyToEl?.innerText.trim().length <
        ('@' + props?.replyTo.username).length
      ) {
        replyToEl.remove();
      }
    } else {
      if (
        contenteditableInputField.value?.innerText.toLocaleLowerCase().trim() ==
        '@' + props?.replyTo!.username.toLocaleLowerCase()
      ) {
        contenteditableInputField.value!.innerHTML = '';

        contenteditableInputField.value!.insertAdjacentHTML(
          'afterbegin',
          replyToFirstEl.value
        );

        const replyToEl = contenteditableInputField.value?.querySelector(
          '.reply-to'
        ) as HTMLElement;
        replyToEl.setAttribute('contenteditable', 'false');

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(contenteditableInputField.value!);
        range.collapse(false);
        selection!.removeAllRanges();
        selection!.addRange(range);
      }
    }
  }

  sanitizedHtmlComment.value = DOMPurify.sanitize(
    contenteditableInputField.value!.innerHTML,
    { USE_PROFILES: { html: true } }
  );
  // .replaceAll(/&nbsp;/g, ' ');

  switch (props.action) {
    case 'post':
      disabledButton.value =
        contenteditableInputField.value?.innerText.length == 0;
      break;
    case 'edit':
      disabledButton.value =
        contenteditableInputField.value?.innerText.length == 0 ||
        contenteditableInputField.value?.innerHTML == props.comment?.content;
      break;
  }
};

const handleFocus = (e: any) => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
    e.target.blur();
    return;
  }

  isFocus.value = true;
  isShowActions.value = true;
};

const handleBlur = (e: any) => {
  isFocus.value = false;
};

const onSubmit = () => {
  loading.value = true;

  switch (props.action) {
    case 'post':
      CommentMovie({
        // content: content.value,
        content: sanitizedHtmlComment.value,
        movieId: props.movieId!,
        parentId:
          props.commentType == 'children' ? props.parent?.id : undefined,
        replyTo:
          props.commentType == 'children' && props?.replyTo
            ? props.replyTo.id
            : undefined,
        movieType: props.movieType!,
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

            contenteditableInputField.value!.innerHTML = '';
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
        id: props.comment!?.id,
        movieId: props.movieId!,
        movieType: props.movieType!,
        commentType: props.commentType!,
        // content: content.value,
        content: sanitizedHtmlComment.value,
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

            contenteditableInputField.value!.innerHTML = '';
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
  contenteditableInputField.value!.innerHTML = '';
  emits('onClickCancel');
};

const onSelectEmoji = (emoji: any) => {
  // console.log(emoji);
  contenteditableInputField.value!.innerHTML += emoji.i;
  disabledButton.value = content.value.length == 0;
};
</script>

<style lang="scss" src="./FormComment.scss"></style>
