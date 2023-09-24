<template>
  <div class="comment" id="comment">
    <h2 class="comment-title title-default">
      Bình luận
      <span class="total-comments">{{ `(${total})` }}</span>
    </h2>
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

      <LoadingCircle
        v-show="loadMore && !disabledLoadMore"
        class="loading-comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getCommentByMovidId } from '~/services/comment';
import FormComment from '~/components/Comment/FormComment/FormComment.vue';
import CommentItem from '~/components/Comment/CommentItem/CommentItem.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';

const props = defineProps<{
  dataMovie: any;
}>();

const commentsList = ref<any[]>([]);
const loading = ref<boolean>(false);
const skip = ref<number>(1);
const total = ref<number>(0);
const loadMore = ref<boolean>(false);
const disabledLoadMore = ref<boolean>(false);

loading.value = true;

useAsyncData(`${props.dataMovie?.media_type}/${props.dataMovie?.id}`, () =>
  getCommentByMovidId(
    props.dataMovie?.id,
    props.dataMovie?.media_type,
    skip.value
  )
)
  .then((response) => {
    commentsList.value = response.data.value?.results;
    total.value = response.data.value?.total;
    skip.value++;
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  })
  .finally(() => {
    loading.value = false;
  });

onMounted(() => {
  window.onscroll = () => {
    if (commentsList.value?.length == 0) {
      return;
    }

    const scrollHeight = Math.round(window.scrollY + window.innerHeight);

    if (
      scrollHeight == document.documentElement.scrollHeight &&
      commentsList.value?.length >= 20
    ) {
      loadMore.value = true;

      getCommentByMovidId(
        props.dataMovie?.id,
        props.dataMovie?.media_type,
        skip.value
      )
        .then((response) => {
          commentsList.value = commentsList.value.concat(response?.results);
          if (response?.results?.length == 0) {
            disabledLoadMore.value = true;
            return;
          }

          skip.value++;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          loadMore.value = false;
        });
    }
  };
});
</script>

<style lang="scss" src="./Comment.scss"></style>
