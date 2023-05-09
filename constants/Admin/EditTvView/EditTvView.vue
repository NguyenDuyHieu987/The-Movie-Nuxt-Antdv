<template>
  <el-page-header @back="$router.go(-1)">
    <template #icon>
      <ArrowLeftOutlined />
    </template>
    <template #title>
      <p style="font-size: 1.6rem">Quay lại</p>
    </template>
    <div class="edit-tv">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-position="top"
        status-icon
        :rules="rules"
        label-width="120px"
        class="edit-tv-form"
      >
        <el-row :gutter="20">
          <el-col :span="12" :xs="{ span: 24 }">
            <el-row :gutter="20">
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Tên phim" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    type="text"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Tên phim gốc" prop="original_name">
                  <el-input
                    v-model="ruleForm.original_name"
                    type="text"
                    autocomplete="off"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Thể loại" prop="genres">
                  <el-select
                    v-model="ruleForm.genres"
                    placeholder="Chọn thể loại"
                    style="width: 500px"
                    multiple
                    :clearable="true"
                  >
                    <el-option
                      v-for="(item, index) in genres"
                      :index="index"
                      :key="item?.id"
                      :value="item.id"
                      :label="item?.name_vietsub"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Quốc gia" prop="original_language">
                  <el-select
                    ref="select"
                    v-model="ruleForm.original_language"
                    placeholder="Chọn quốc gia"
                  >
                    <el-option
                      v-for="(item, index) in countries"
                      :index="index"
                      :key="item?.iso_639_1"
                      :value="item?.iso_639_1"
                      :label="item?.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Số lượng tập" prop="budget">
                  <el-input-number
                    v-model="ruleForm.number_of_episodes"
                    :step="1"
                    step-strictly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Doanh thu" prop="revenue">
                  <a-input-number
                    v-model:value="ruleForm.revenue"
                    :min="0"
                    :step="100000"
                    :formatter="
                      (value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    "
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12" :xs="{ span: 24 }">
            <el-row :gutter="20">
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Ngày phát hình" prop="first_air_date">
                  <el-date-picker
                    v-model="ruleForm.first_air_date"
                    type="date"
                    placeholder="Chọn ngày"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Ngày ra tập mới nhất" prop="last_air_date">
                  <el-date-picker
                    v-model="ruleForm.last_air_date"
                    type="date"
                    placeholder="Chọn ngày"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24" :lg="{ span: 15 }">
                <el-form-item label="Nội dung" prop="overview">
                  <el-input
                    v-model="ruleForm.overview"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder="Nhập nội dung phim"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item
                  label="Thời lượng trên tập (phút)"
                  prop="episode_run_time"
                >
                  <el-input-number
                    v-model="ruleForm.episode_run_time"
                    :step="1"
                    step-strictly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :xs="{ span: 12 }">
                <el-form-item label="Trạng thái" prop="status">
                  <el-select
                    ref="select"
                    v-model="ruleForm.status"
                    placeholder="Chọn trạng thái"
                  >
                    <el-option value="Hoàn thành" label="Hoàn thành" />
                    <el-option
                      value="Đang tiến thành"
                      label="Đang tiến thành"
                    />
                    <el-option
                      value="Chưa hoàn thành"
                      label="Chưa hoàn thành"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :xs="{ span: 24 }">
            <el-form-item class="image-form-item" label="Chọn Poster">
              <el-upload
                action="#"
                list-type="picture"
                :auto-upload="false"
                :on-change="handlePosterSuccess"
                :limit="1"
                accept="image/jpeg"
              >
                <el-button :icon="UploadOutlined">Click để chọn ảnh</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="{ span: 24 }">
            <el-form-item class="image-form-item" label="Chọn Backdrop">
              <el-upload
                action="#"
                list-type="picture"
                :auto-upload="false"
                :on-change="handleBackdropSuccess"
                :limit="1"
                accept="image/jpeg"
              >
                <el-button :icon="UploadOutlined">Click để chọn ảnh</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="footer-form">
          <el-button @click="resetForm" type="danger" plain> Hủy </el-button>
          <el-button type="primary" @click="submitForm">
            Cập nhật phim
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-page-header>
</template>
<script>
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons-vue';
// import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import { onBeforeMount, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  getAllGenre,
  getAllNational,
  getAllYear,
  getTvById,
} from '@/services/MovieService';
import { useRoute } from 'vue-router';

export default {
  components: { ArrowLeftOutlined },
  setup() {
    const route = useRoute();
    const dataMovie = ref([]);
    const genres = ref([]);
    const years = ref([]);
    const countries = ref([]);
    const ruleFormRef = ref({});
    const ruleForm = reactive({
      name: '',
      original_name: '',
      original_language: '',
      first_air_date: '',
      last_air_date: '',
      genres: [],
      overview: '',
      number_of_episodes: 0,
      episode_run_time: 60,
      status: '',
      poster: {},
      backdrop: {},
    });

    onBeforeMount(() => {
      Promise.all([getAllGenre(), getAllYear(), getAllNational()])
        .then((res) => {
          genres.value = res[0].data;
          years.value = res[1].data.sort(function (a, b) {
            return +b.name.slice(-4) - +a.name.slice(-4);
          });
          countries.value = res[2].data;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      getTvById(route.params.id)
        .then((response) => {
          ruleForm.name = response.data.name;
          ruleForm.original_name = response.data.original_name;
          ruleForm.original_language = response.data.original_language;
          ruleForm.last_air_date = response.data.last_air_date;
          ruleForm.release_date = response.data.release_date;
          ruleForm.genres = Array.from(response.data.genres, (item) => item.id);
          ruleForm.overview = response.data.overview;
          ruleForm.number_of_episodes = response.data.number_of_episodes;
          ruleForm.episode_run_time = response.data.episode_run_time;
          ruleForm.status = response.data.status;
          ruleForm.poster = response.data.poster;
          ruleForm.backdrop = response.data.backdrop;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    });

    const handlePosterSuccess = (response) => {
      if (response.raw.type !== 'image/jpeg') {
        ElMessage.error('Image must be JPG format!');
        return false;
      } else if (response.raw.size / 1024 / 1024 > 2) {
        ElMessage.error('Image size can not exceed 2MB!');
        return false;
      }
      ruleForm.poster = response;
    };

    const handleBackdropSuccess = (response) => {
      if (response.raw.type !== 'image/jpeg') {
        ElMessage.error('Ảnh phải là kiểu JPG!');
        return false;
      } else if (response.raw.size / 1024 / 1024 > 2) {
        ElMessage.error('Ảnh không được vượt quá 2MB!');
        return false;
      }
      ruleForm.backdrop = response;
    };

    const handleUploadProgress = (response) => {
      if (response.raw.type !== 'image/jpeg') {
        ElMessage.error('Image must be JPG format!');
        return false;
      } else if (response.raw.size / 1024 / 1024 > 2) {
        ElMessage.error('Image size can not exceed 2MB!');
        return false;
      }
    };

    const submitForm = () => {
      console.log(ruleForm);
    };
    const resetForm = () => {
      ruleForm.genres = ruleForm.genres.map((genre) => {
        genres.value.find((item) => item.id == genre.id);
      });
      console.log(ruleForm);
    };

    return {
      dataMovie,
      UploadOutlined,
      ruleFormRef,
      ruleForm,
      genres,
      years,
      countries,
      handlePosterSuccess,
      handleBackdropSuccess,
      handleUploadProgress,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style scoped lang="scss" src="./EditTvView.scss"></style>
