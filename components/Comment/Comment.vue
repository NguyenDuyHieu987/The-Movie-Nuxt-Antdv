<template>
  <div class="comment" id="comment">
    <h2 class="gradient-title-default">Bình luận</h2>
    <div class="comment-body">
      <FormComment
        v-model:commentsList="commentsList"
        :movieId="dataMovie?.id"
        :movieType="dataMovie?.media_type"
      />

      <LoadingCircle v-if="loading" class="loading-comment" />

      <div v-else class="list-comment">
        <CommentItem
          v-for="(item, index) in commentsList"
          :key="item?.id"
          :index="index"
          :item="item"
          :movieId="dataMovie?.id"
          :movieType="dataMovie?.media_type"
          v-model:commentsList="commentsList"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getCommentByMovidId } from '~/services/comment';
import FormComment from '@/components/Comment/FormComment/FormComment.vue';
import CommentItem from '@/components/Comment/CommentItem/CommentItem.vue';
import LoadingCircle from '@/components/LoadingCircle/LoadingCircle.vue';

const props = defineProps<{
  dataMovie: any;
}>();

const commentsList = ref<any[]>([]);
const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;

  getCommentByMovidId(props.dataMovie?.id, props.dataMovie?.media_type)
    .then((response) => {
      commentsList.value = response?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" src="./Comment.scss" scoped></style>
