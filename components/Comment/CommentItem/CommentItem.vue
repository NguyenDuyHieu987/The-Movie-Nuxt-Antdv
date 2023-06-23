<template>
  <div class="comment-item">
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
        v-model:commentsList="commentsList"
        v-model:listReplies="listReplies"
        :movieId="movieId"
        :movieType="movieType"
        :showActions="true"
        :comment="item"
        commentType="children"
        @onClickCancel="isShowFormComment = false"
        @onSuccessCommentChild="handleSuccessCommentChild"
      />

      <div class="replies">
        <a-button
          v-show="item?.childrens > 0"
          class="reply"
          type="text"
          @click="onClickShowReplies"
        >
          <template #icon>
            <Icon
              name="ic:baseline-arrow-drop-down"
              class="caret"
              :class="{ active: isShowReplies }"
            />
          </template>
          {{ numberReplies + ' Phản hồi' }}
        </a-button>

        <div class="list-replies" v-if="isShowReplies">
          <CommentItemChild
            v-for="(item1, index) in listReplies"
            :key="item1?.id"
            :index="index"
            :item="item1"
            :movieId="item1?.movie_id"
            :movieType="movieType"
            commentType="children"
            v-model:listReplies="listReplies"
            @onSuccessCommentChild="handleSuccessCommentChild"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getCommentByMovidId_ParentId } from '~/services/comment';
import FormComment from '@/components/Comment/FormComment/FormComment.vue';
import CommentItemChild from '@/components/Comment/CommentItemChild/CommentItemChild.vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  item: any;
  movieId: string;
  movieType: string;
}>();

const store = useStore();
const { userAccount } = storeToRefs<any>(store);
const commentsList = defineModel<any[]>('commentsList');
const isShowFormComment = ref<boolean>(false);
const isShowReplies = ref<boolean>(false);
const listReplies = ref<any[]>([]);
const loading = ref<boolean>(false);
const numberReplies = ref<number>(props.item?.childrens);

onBeforeMount(() => {});

const onClickShowReplies = () => {
  isShowReplies.value = !isShowReplies.value;

  if (listReplies.value.length == 0) {
    loading.value = true;

    getCommentByMovidId_ParentId(props.movieId, props.item?.id)
      .then((response) => {
        listReplies.value = response?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loading.value = true;
      });
  }
};

const handleSuccessCommentChild = (data: any) => {
  listReplies.value.push(data);
  numberReplies.value++;
};
</script>

<style lang="scss" src="./CommentItem.scss"></style>
