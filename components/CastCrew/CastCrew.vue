<template>
  <div class="cast-crew">
    <!-- <a-tabs class="cast-crew-tabs" v-model:activeKey="activeTabCast">
      <a-tab-pane key="cast" tab="Diễn viên">
        <SliderGroup
          v-if="dataCredit?.cast"
          :data="dataCredit?.cast?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <SwiperSlide
              v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="cast"
              />
            </SwiperSlide>
          </template>
        </SliderGroup>
      </a-tab-pane>
      <a-tab-pane key="crew" tab="Đội ngũ" force-render>
        <SliderGroup
          v-if="dataCredit?.crew"
          :data="dataCredit?.crew?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <SwiperSlide
              v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="crew"
              />
            </SwiperSlide>
          </template>
        </SliderGroup>
      </a-tab-pane>
    </a-tabs> -->

    <el-tabs v-model="activeTabCast" class="cast-crew-tabs">
      <el-tab-pane name="cast" label="Diễn viên">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div v-for="(item, index) in 10" :index="index" :key="index">
              <el-skeleton-item class="skeleton-img" />
              <div class="content-skeleton">
                <el-skeleton-item variant="text" style="width: 70%" />
                <el-skeleton-item variant="text" style="width: 100%" />
              </div>
            </div>
          </template>
          <template #default>
            <SliderGroup :data="dataCredit?.cast?.slice(0, 20)">
              <template #content>
                <div
                  class="slider-item"
                  v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
                >
                  <CastCard
                    :index="index"
                    :key="item.id"
                    :item="item"
                    type="cast"
                  />
                </div>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane name="crew" label="Đội ngũ">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <el-skeleton-item
              class="skeleton-img"
              v-for="(item, index) in 10"
              :index="index"
              :key="index"
            />
          </template>
          <template #default>
            <SliderGroup :data="dataCredit?.crew?.slice(0, 20)">
              <template #content>
                <div
                  class="slider-item"
                  v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
                >
                  <CastCard
                    :index="index"
                    :key="item.id"
                    :item="item"
                    type="crew"
                  />
                </div>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import CastCard from '~/components/CastCard/CastCard.vue';
import SliderGroup from '~/components/SliderGroup/SliderGroup.vue';
import { getCredits } from '~/services/credit';

const props = defineProps<{
  dataMovie: any;
}>();

const dataCredit = ref<any>(props.dataMovie?.credits);
const loading = ref<boolean>(false);
const activeTabCast = ref<string>('cast');

loading.value = true;

// useAsyncData(`credits/${props.dataMovie?.id}`, () =>
//   getCredits(props.dataMovie?.id)
// )
getCredits(props.dataMovie?.id)
  .then((response) => {
    dataCredit.value = response;
    loading.value = false;
  })
  .finally(() => {});

// const { data: dataCredit, pending } = await useAsyncData(
//   `credits/${props.dataMovie?.id}`,
//   () => getCredits(props.dataMovie?.id),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.items;
//     },
//   }
// );
</script>

<style lang="scss" src="./CastCrew.scss"></style>
