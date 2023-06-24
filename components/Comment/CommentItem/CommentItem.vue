<template>
  <div class="comment-item">
    <div class="comment-item-container">
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
        <div class="content-comment-box">
          <div class="main-content">
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

        <FormComment
          v-show="isShowFormComment"
          v-model:commentsList="commentsList"
          v-model:listReplies="listReplies"
          :movieId="movieId"
          :movieType="movieType"
          :showActions="true"
          :comment="item"
          :isShowFormComment="isShowFormComment"
          commentType="children"
          @onClickCancel="isShowFormComment = false"
          @onSuccessCommentChild="handleSuccessCommentChild"
        />

        <div class="replies">
          <a-button
            v-show="numberReplies > 0"
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
            {{ numberReplies != 0 && numberReplies + ' Phản hồi' }}
          </a-button>

          <LoadingCircle v-if="loadingReplies" class="loading-replies" />

          <div
            v-else-if="isShowReplies && !loadingReplies"
            class="list-replies"
          >
            <CommentItemChild
              v-for="(item1, index) in listReplies"
              :key="item1?.id"
              :index="index"
              :item="item1"
              :movieId="item1?.movie_id"
              :parent="item"
              :movieType="movieType"
              commentType="children"
              v-model:listReplies="listReplies"
              @onSuccessCommentChild="handleSuccessCommentChild"
              @omSuccessRemoveCommentChild="handleSuccessRemoveCommentChild"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  getCommentByMovidId_ParentId,
  DeleteComment,
} from '~/services/comment';
import FormComment from '@/components/Comment/FormComment/FormComment.vue';
import CommentItemChild from '@/components/Comment/CommentItemChild/CommentItemChild.vue';
import LoadingCircle from '@/components/LoadingCircle/LoadingCircle.vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { ElNotification } from 'element-plus';

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
const loadingReplies = ref<boolean>(false);
const numberReplies = ref<number>(+props.item?.childrens || 0);

onBeforeMount(() => {});

const onClickShowReplies = () => {
  isShowReplies.value = !isShowReplies.value;

  if (listReplies.value.length == 0) {
    loadingReplies.value = true;

    getCommentByMovidId_ParentId(props.movieId, props.item?.id)
      .then((response) => {
        listReplies.value = response?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loadingReplies.value = false;
      });
  }
};

const handleSuccessCommentChild = (data: any) => {
  if (!isShowReplies.value) {
    isShowReplies.value = true;
  }
  listReplies.value.push(data);
  numberReplies.value++;
};

const handleSuccessRemoveCommentChild = () => {
  numberReplies.value--;
};

const handleRemoveComment = () => {
  DeleteComment({
    id: props.item?.id,
    movieId: props.movieId,
    movieType: props.movieType,
    commentType: 'parent',
  })
    .then((response) => {
      if (response?.success) {
        commentsList.value = _.reject(commentsList.value, (x) => {
          return x.id === props.item?.id;
        });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa bình luận thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
          showClose: false,
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

<style lang="scss" src="./CommentItem.scss"></style>
