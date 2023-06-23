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
          v-if="isShowFormComment"
          v-model:listReplies="listReplies"
          :movieId="movieId"
          :movieType="movieType"
          :showActions="true"
          :parent="item"
          commentType="children"
          :contentComment="item?.username"
          @onClickCancel="isShowFormComment = false"
          @onSuccessCommentChild="handleSuccessCommentChild"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormComment from '@/components/Comment/FormComment/FormComment.vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  item: any;
  movieId: string;
  movieType: string;
}>();

const emits = defineEmits<{
  onSuccessCommentChild: [data: any];
}>();

const store = useStore();
const listReplies = defineModel<any[]>('listReplies');
const isShowFormComment = ref<boolean>(false);

onBeforeMount(() => {});

const handleSuccessCommentChild = (data: any) => {
  emits('onSuccessCommentChild', data);
};
</script>

<style lang="scss" src="./CommentItemChild.scss"></style>
