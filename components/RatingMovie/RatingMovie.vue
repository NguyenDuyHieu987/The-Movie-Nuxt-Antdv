<template>
  <div class="rating-movie">
    <div class="rate-bar">
      <a-rate
        v-model:value="vote_Average"
        allow-half
        :count="10"
        :tooltips="tooltipRating"
        @change="handleRating"
      >
        <template #character>
          <svg
            class="icon star"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3z"
            />
          </svg>
        </template>
      </a-rate>
      <span class="ant-rate-text">{{
        tooltipRating[Math.round(vote_Average) - 1]
      }}</span>
    </div>
    <p>
      {{ `(${vote_Average?.toFixed(2)} điểm / ${vote_Count} lượt)` }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ratingMovie } from '~/services/movie';
import { ratingTV } from '~/services/tv';
import { notification } from 'ant-design-vue';
import { CheckCircleFilled } from '@ant-design/icons-vue';
import axios from 'axios';

const props = defineProps<{
  voteAverage: number;
  voteCount: number;
  movieId: number;
  isEpisodes: boolean;
}>();

const vote_Average = ref<number>(props.voteAverage);
const vote_Count = ref<number>(props.voteCount);

const tooltipRating = ref<string[]>([
  'Dở tệ',
  'Dở',
  'Không hay',
  'Không hay lắm',
  'Bình thường',
  'Xem được',
  'Có vẻ hay',
  'Hay',
  'Rất hay',
  'Tuyệt hay',
]);

const handleRating = (value: number) => {
  if (props?.isEpisodes) {
    ratingTV(props?.movieId, { value: value })
      .then((response) => {
        if (response?.success == true) {
          notification.open({
            message: 'Cảm ơn bạn đã đánh giá!',
            description: `Đánh giá thành công ${value} điểm.`,
            icon: () =>
              h(CheckCircleFilled, {
                style: 'color: green',
              }),
          });
          vote_Average.value = response?.vote_average;
          vote_Count.value = response?.vote_count;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  } else {
    ratingMovie(props?.movieId, { value: value })
      .then((response) => {
        if (response?.success == true) {
          notification.open({
            message: 'Cảm ơn bạn đã đánh giá!',
            description: `Đánh giá thành công ${value} điểm.`,
            icon: () =>
              h(CheckCircleFilled, {
                style: 'color: green',
              }),
          });
          vote_Average.value = response?.vote_average;
          vote_Count.value = response?.vote_count;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }
};
</script>

<style lang="scss" scoped src="./RatingMovie.scss"></style>
