<template>
  <div
    class="video-player"
    ref="videoPlayer"
    :class="{
      scrubbing: videoStates.isScrubbingProgressBar,
      'hide-controls': videoStates.isHideControls,
      'show-controls': videoStates.isShowControls,
      pause: !videoStates.isPlayVideo || videoStates.isEndedVideo,
    }"
  >
    <div v-if="settingStates.switchBackgroud" class="overlay-backdrop">
      <!-- <canvas ref="canvasOverlayBackdrop"> </canvas> -->
      <nuxt-img :src="backdrop" loading="lazy" alt="" />
    </div>

    <!-- preload="auto" -->
    <!-- autoplay
      muted -->
    <video
      id="video-player"
      ref="video"
      :poster="backdrop"
      @loadstart="onLoadStartVideo"
      @loadeddata="onLoadedDataVideo"
      @canplay="onCanPlayVideo"
      @timeupdate="onTimeUpdateVideo"
      @ended="onEndedVideo"
      @waiting="onWaitingVideo"
      @progress="onProgressVideo"
      @play="onPlayVideo"
      @pause="onPauseVideo"
      @playing="onPLayingVideo"
      v-lazy-load
    >
      <!-- <source :data-src="blobVideoSrc" ref="srcVideo" type="video/mp4" /> -->
    </video>

    <div class="float-center">
      <div
        class="loading-video"
        v-show="
          videoStates.isLoading &&
          !videoStates.isEndedVideo &&
          !videoStates.isRewind.enable &&
          !videoStates.isLoaded
        "
      >
        <Icon name="icon-park-outline:loading-four" />
        <!-- <Icon name="line-md:loading-twotone-loop" /> -->
        <!-- <Icon name="line-md:loading-loop" /> -->
      </div>

      <div class="replay" v-show="videoStates.isEndedVideo">
        <Icon
          name="ic:baseline-replay"
          class="replay"
          @click="onClickReplayVideo"
        />
        <span @click="onClickReplayVideo"> Phát lại </span>
      </div>

      <div
        v-show="
          videoStates.isShowNotify &&
          dataMovie?.in_history &&
          videoStates.isLoaded &&
          !videoStates.isLoading
        "
        class="notify"
      >
        <CloseBtn
          class="transparent close-notify"
          @click="videoStates.isShowNotify = false"
        />

        <div class="notify-content">
          <span>
            Bạn đã xem đến:
            {{ formatDuration(dataMovie?.history_progress?.seconds) }}
          </span>
        </div>

        <div class="notify-footer">
          <a-button type="text" @click="onClickPlayAgain">
            Xem lại từ đầu
          </a-button>
          <a-button
            v-show="video?.duration - dataMovie?.history_progress?.seconds > 10"
            type="text"
            @click="onClickKeepWatching"
          >
            Xem tiếp
          </a-button>
        </div>
      </div>
    </div>

    <div
      class="overlay-controls-animation"
      :class="{
        active: videoStates.isActiveControlsAnimation,
        rewind: videoStates.isRewind,
      }"
    >
      <div class="box-icon">
        <div v-show="!videoStates.isRewind.enable" class="play-pause">
          <Icon
            v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
            name="ic:play-arrow"
            class="play"
            @click="onClickVideo"
          />

          <Icon
            v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
            name="ic:baseline-pause"
            class="play"
            @click="onClickVideo"
          />
        </div>

        <div v-show="videoStates.isRewind.enable" class="replay-forward">
          <span v-show="videoStates.isRewind.replay">-10</span>
          <span v-show="videoStates.isRewind.forward">+10</span>
        </div>
      </div>
    </div>

    <div
      class="timeline"
      :class="{
        active:
          videoStates.isMouseMoveOverlayProgress ||
          videoStates.isScrubbingProgressBar,
      }"
      ref="timeline"
    >
      <div class="timeline-container">
        <div class="img-box">
          <canvas class="canvas-preview-img" ref="canvasPreviewImg"> </canvas>
          <!-- <nuxt-img class="preview-img" loading="lazy" /> -->
        </div>
      </div>
      <span class="timeline-indicator">{{ timelineUpdate }} </span>
    </div>

    <div
      v-show="videoStates.isLoaded"
      class="controls"
      tabindex="-1"
      @keydown="onKeyDownVideo"
    >
      <div class="controls-container">
        <div
          class="overlay-progress"
          @mousemove="onMouseMoveProgressBar"
          @mousedown="onMouseDownProgressBar"
          @mouseup="onMouseUpProgressBar"
          @mouseleave="videoStates.isMouseMoveOverlayProgress = false"
          ref="overlayProgress"
        >
          <div
            class="overlay-progress-padding"
            ref="overlayProgressPadding"
            @mousemove="onMouseMoveOverlayProgress"
          ></div>

          <div class="progress-bar" ref="progressBar"></div>
        </div>

        <div class="main-controls">
          <div class="left">
            <div class="play-pause">
              <Icon
                v-show="videoStates.isEndedVideo"
                name="ic:baseline-replay"
                class="replay"
                @click="onClickReplayVideo"
              />

              <Icon
                v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
                name="ic:play-arrow"
                class="play"
                @click="onClickPlay"
              />

              <Icon
                v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
                name="ic:baseline-pause"
                class="play"
                @click="onClickPause"
              />
            </div>

            <div class="replay-forward">
              <Icon
                name="ic:baseline-replay-10"
                class="replay"
                @click="onClickRewind"
              />

              <!-- <Icon
                name="ic:baseline-forward-10"
                class="forward"
                @click="onClickForward"
              /> -->
            </div>
            <div class="volume">
              <div>
                <Icon
                  v-show="!videoStates.isVolumeOff && volume <= 30"
                  name="ic:baseline-volume-down"
                  class="fullscreen"
                  @click="onClickVolumeUp"
                />

                <Icon
                  v-show="!videoStates.isVolumeOff && volume > 30"
                  name="ic:baseline-volume-up"
                  @click="onClickVolumeUp"
                />

                <Icon
                  v-show="videoStates.isVolumeOff"
                  name="ic:baseline-volume-off"
                  @click="onClickVolumeOff"
                />
              </div>
              <a-slider
                class="volume-slider"
                :class="{ muted: videoStates.isVolumeOff }"
                v-model:value="volume"
                :tooltipVisible="false"
                @change="onChangeVolume"
              />
            </div>

            <div class="timeupdate-duration">
              <span class="timeupdate">{{ timeUpdate }} </span>
              <span class="separate"> / </span>
              <span class="duration">{{ duration }} </span>
            </div>
          </div>

          <div class="right">
            <div class="rewind-forward">
              <Icon name="ic:baseline-fast-rewind" @click="onClickRewind" />
              <Icon name="ic:baseline-fast-forward" @click="onClickForward" />
            </div>

            <div class="setting" :class="{ active: settingStates.enable }">
              <Icon
                name="ic:baseline-settings"
                class="setting"
                @click="
                  settingStates.enable = !settingStates.enable;
                  onCloseSettings();
                "
              />
            </div>

            <div class="picture-in-picture">
              <Icon
                name="ic:baseline-picture-in-picture-alt"
                @click="onClickPictureInPicture"
              />
            </div>

            <div class="fullscreen-exit">
              <Icon
                v-show="!videoStates.isFullScreen"
                name="ic:baseline-fullscreen"
                class="fullscreen"
                @click="onClickFullScreen"
              />

              <Icon
                v-show="videoStates.isFullScreen"
                name="ic:baseline-fullscreen-exit"
                @click="onClickFullScreenExit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="video-mask"
      tabindex="-1"
      @click="onClickVideo"
      @mousemove="onMouseMoveVideo"
      @mouseleave="onMouseLeaveVideo"
      @keydown="onKeyDownVideo"
    ></div>

    <div class="background-controls"></div>

    <div
      class="settings"
      :class="{
        active: settingStates.enable && !videoStates.isHideControls,
        general: !settingStates.subSetting.enable,
        'sub-setting': settingStates.subSetting.enable,
      }"
    >
      <div v-show="!settingStates.subSetting.enable" class="setting-options">
        <div
          class="setting-item switch-background"
          @click="
            settingStates.switchBackgroud = !settingStates.switchBackgroud
          "
        >
          <div class="left">
            <Icon name="ic:outline-light-mode" />
            <span>Nền sáng</span>
          </div>
          <div class="right">
            <a-switch
              @click="
                settingStates.switchBackgroud = !settingStates.switchBackgroud
              "
              v-model:checked="settingStates.switchBackgroud"
            />
          </div>
        </div>
        <div
          class="setting-item playback"
          @click="
            settingStates.subSetting.enable = true;
            settingStates.subSetting.playback = true;
          "
        >
          <div class="left">
            <Icon name="ic:baseline-fast-forward" />
            <span>Tốc độ phát</span>
          </div>

          <div class="right">
            <span>{{ settings.playback.current }}</span>
            <Icon name="ic:baseline-arrow-forward-ios" />
          </div>
        </div>

        <div
          class="setting-item quality"
          @click="
            settingStates.subSetting.enable = true;
            settingStates.subSetting.quality = true;
          "
        >
          <div class="left">
            <Icon name="ic:baseline-high-quality" />
            <span>Chất lượng</span>
          </div>

          <div class="right">
            <span>{{ settings.quality.current }}</span>
            <Icon name="ic:baseline-arrow-forward-ios" />
          </div>
        </div>
      </div>

      <div
        v-show="settingStates.subSetting.enable"
        class="sub-setting"
        :class="{
          playback: settingStates.subSetting.playback,
          quality: settingStates.subSetting.quality,
        }"
      >
        <div
          v-show="settingStates.subSetting.playback"
          class="sub-setting-item play-back"
        >
          <div
            class="header"
            @click="
              settingStates.subSetting.enable = false;
              settingStates.subSetting.playback = false;
            "
          >
            <div class="left">
              <Icon name="ic:baseline-arrow-back-ios" />
              <span>Tốc độ phát</span>
            </div>
            <div class="right">
              <span>Tùy chỉnh</span>
            </div>
          </div>

          <ul class="menu">
            <li
              v-for="(item, index) in settings.playback.all"
              :key="index"
              :class="{ active: settings.playback.current == item }"
              @click="onClickItemPlayback(item)"
            >
              <Icon
                v-if="settings.playback.current == item"
                name="ic:baseline-check"
              />
              <span> {{ item }}</span>
            </li>
          </ul>
        </div>

        <div
          v-show="settingStates.subSetting.quality"
          class="sub-setting-item quality"
        >
          <div
            class="header"
            @click="
              settingStates.subSetting.enable = false;
              settingStates.subSetting.quality = false;
            "
          >
            <div class="left">
              <Icon name="ic:baseline-arrow-back-ios" />
              <span>Chất lượng</span>
            </div>
          </div>

          <ul class="menu">
            <li
              v-for="(item, index) in settings.quality.all"
              :key="index"
              :class="{ active: settings.quality.current == item }"
              @click="settings.quality.current = item"
            >
              <Icon
                v-if="settings.quality.current == item"
                name="ic:baseline-check"
              />
              <span> {{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/ButtonTemplate/CloseBtn/CloseBtn.vue';
import axios from 'axios';
import { getVideo } from '~/services/video';

const props = defineProps<{
  dataMovie: any;
  backdrop: string;
  videoUrl: string;
}>();

const emits = defineEmits<{
  onPlay: [e: any];
  onTimeUpdate: [e: any];
}>();

const blobVideoSrc = ref<string>('');
const videoPlayer = ref();
const video = ref();
const videoTemp = ref();
const overlayProgress = ref();
const overlayProgressPadding = ref();
const progressBar = ref();
const timeline = ref();
const canvasPreviewImg = ref();
const canvasOverlayBackdrop = ref();
const videoStates = reactive({
  isLoading: false,
  isLoaded: false,
  isPlayVideo: false,
  isScrubbingProgressBar: false,
  isFullScreen: false,
  isVolumeOff: false,
  isEndedVideo: false,
  isMouseMoveOverlayProgress: false,
  isHideControls: false,
  isShowControls: false,
  isShowNotify: props.dataMovie?.in_history || false,
  isActiveControlsAnimation: false,
  isRewind: {
    enable: false,
    replay: false,
    forward: false,
  },
});
const settingStates = reactive({
  enable: false,
  switchBackgroud: true,
  subSetting: {
    enable: false,
    playback: false,
    quality: false,
  },
});
const settings = reactive({
  playback: {
    all: ['0.25', '0.5', '0.75', 'Bình thường', '1.25', '1.5', '1.75', '2'],
    current: 'Bình thường',
  },
  quality: {
    all: [
      '2560 - 4K',
      '1440 - 2K',
      '1080 - HD',
      '720',
      '480',
      '360',
      'Tự động',
    ],
    current: '1080 - HD',
  },
});
const volume = ref<number>(70);
const timeUpdate = ref<string>('00:00');
const timelineUpdate = ref<string>('00:00');
const duration = ref<string>('00:00');
const timeOut = ref<any>();

const setBlobSrcVideo = async (value: string) => {
  videoStates.isLoading = true;

  await getVideo(value)
    .then((response) => {
      // const metadata = {
      //   type: data.type || 'video/mp4',
      // };

      // const file = new File([data], 'test.mp4', metadata);

      const blobSrc = (window.URL || window.webkitURL).createObjectURL(
        new Blob([response.data])
      );

      // const blobSrc = URL.createObjectURL(blob);

      video.value.src = blobSrc;

      // videoTemp.value = document.createElement('video');
      // videoTemp.value.src = blobSrc;
      // videoTemp.value.pause();
      // videoTemp.value.muted = true;
    })
    .finally(() => {
      videoStates.isLoading = false;
      // videoStates.isPlayVideo = true;
      // video.value.play();
      // video.value.muted = false;
      video.value.load();
    });
};

onBeforeMount(() => {
  setBlobSrcVideo(props.videoUrl);
});

onMounted(() => {
  video.value.volume = volume.value / 100;
  progressBar.value.style.setProperty('--progress-width', 0);

  window.onmouseup = () => {
    videoStates.isScrubbingProgressBar = false;

    if (videoStates.isLoaded) {
      if (videoStates.isEndedVideo || videoStates.isLoading) {
        return;
      }

      if (videoStates.isPlayVideo) {
        video.value.play();
      }
    }
  };

  window.onmousemove = (e) => {
    if (videoStates.isScrubbingProgressBar) {
      handleTimeUpdate(e);
    }
  };

  window.onclick = (e: any) => {
    if (settingStates.enable) {
      if (
        !e.target.closest('.video-player .settings') &&
        !e.target.closest(
          '.video-player .controls .main-controls .right svg.setting'
        )
      ) {
        settingStates.enable = false;
        onCloseSettings();
      }
    }
  };
});

watch(props, (newVal, oldVal) => {
  setBlobSrcVideo(newVal.videoUrl);
  video.value.currentTime = 0;
  progressBar.value.style.setProperty('--progress-width', 0);
  // video.value.load();

  // video.value.play();
  // if (!videoStates.isPlayVideo) {
  //   videoStates.isPlayVideo = true;
  // }

  // if (videoStates.isPlayVideo) {
  //   video.value.play();
  // } else {
  //   video.value.pause();
  // }
});

watch(volume, () => {
  videoStates.isVolumeOff = video.value.volume == 0;
});

const handleTimeUpdate = (e: any) => {
  if (videoStates.isPlayVideo) {
    video.value.pause();
  }

  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  progressBar.value.style.setProperty('--progress-width', percent);

  video.value.currentTime = percent * video.value.duration;

  videoStates.isEndedVideo = video.value.currentTime == video.value.duration;

  drawTimeLine(e);
};

const formatDuration = (time: number) => {
  let hours: number | string = Math.floor(time / 3600);
  let mins: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time % 60);

  if (hours == 0) {
    seconds < 10 ? (seconds = '0' + seconds) : seconds;
    return `${mins}:${seconds}`;
  } else {
    mins < 10 ? (mins = '0' + mins) : mins;
    seconds < 10 ? (seconds = '0' + seconds) : seconds;
    return `${hours}:${mins}:${seconds}`;
  }
};

const onLoadStartVideo = () => {
  // console.log('load start video');
  video.value.currentTime = 0;
  progressBar.value.style.setProperty('--progress-width', 0);
};

const onCanPlayVideo = () => {
  // console.log('can play video');
};

const onLoadedDataVideo = () => {
  // console.log('loaded start video');
  videoStates.isLoaded = true;
  duration.value = formatDuration(video.value.duration);
};

const onTimeUpdateVideo = (e: any) => {
  timeUpdate.value = formatDuration(e.target.currentTime);
  const percent = e.target.currentTime / e.target.duration;
  progressBar.value.style.setProperty('--progress-width', percent);

  emits('onTimeUpdate', {
    seconds: video.value?.currentTime,
    percent: video.value?.currentTime / video.value?.duration,
    duration: video.value?.duration,
  });

  // set source overlay backdrop
  // const ctx = canvasOverlayBackdrop.value.getContext('2d');

  // ctx.drawImage(video.value, 0, 0);

  // canvasOverlayBackdrop.value.toBlob((blob: any) => {
  //   const overlayBackdrop = videoPlayer.value.querySelector(
  //     '.overlay-backdrop img'
  //   ) as HTMLImageElement;

  //   overlayBackdrop.src = URL.createObjectURL(blob);
  // });
};

const onProgressVideo = (e: any) => {
  // console.log(e);
  // videoStates.isLoading = true;
};

const onMouseLeaveVideo = () => {
  if (videoStates.isLoaded) {
    clearTimeout(timeOut.value);
    videoStates.isHideControls = false;
    videoStates.isShowControls = false;
  }
};

const onMouseMoveVideo = () => {
  if (videoStates.isPlayVideo && !videoStates.isEndedVideo) {
    videoStates.isHideControls = false;
    clearTimeout(timeOut.value);

    timeOut.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }
};

const onWaitingVideo = (e: any) => {
  videoStates.isLoading = true;
};

const onPLayingVideo = () => {
  videoStates.isLoading = false;
};

const onPlayVideo = (e: any) => {
  // videoStates.isPlayVideo = true;
  emits('onPlay', {
    seconds: e!.target!.currentTime,
    percent: e!.target!.currentTime / e!.target!.duration,
    duration: e!.target!.duration,
  });
};

const onPauseVideo = () => {
  // videoStates.isPlayVideo = false;
};

const checkEndedVideo = () => {
  if (video.value.ended) {
    videoStates.isEndedVideo = true;
  } else {
    videoStates.isEndedVideo = false;
  }
};

const onEndedVideo = () => {
  videoStates.isEndedVideo = true;
  videoStates.isShowControls = true;
};

const onClickPlay = () => {
  videoStates.isPlayVideo = true;
  video.value.play();
};

const onClickPause = () => {
  videoStates.isPlayVideo = false;
  video.value.pause();
};

const onClickReplayVideo = () => {
  video.value.currentTime = 0;
  progressBar.value.style.setProperty('--progress-width', 0);
  videoStates.isPlayVideo = true;
  videoStates.isEndedVideo = false;
  videoStates.isShowControls = false;
  video.value.play();
};

const playVideo = () => {
  video.value.play();
  videoStates.isPlayVideo = true;

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

  videoStates.isRewind.enable = false;
};

const pauseVideo = () => {
  video.value.pause();
  videoStates.isPlayVideo = false;

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

  videoStates.isRewind.enable = false;
};

const onClickVideo = (e: any) => {
  if (video.value.ended || videoStates.isEndedVideo || videoStates.isLoading) {
    return;
  }

  if (videoStates.isPlayVideo) {
    pauseVideo();
    // hide controls
    clearTimeout(timeOut.value);
    videoStates.isHideControls = false;
  } else {
    playVideo();
    // hide controls
    videoStates.isHideControls = false;
    clearTimeout(timeOut.value);

    timeOut.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }
};

const rewindVideo = (value: number) => {
  if (video.value.currentTime != 0) {
    video.value.currentTime -= value;
    checkEndedVideo();

    const percent = video.value.currentTime / video.value.duration;
    progressBar.value.style.setProperty('--progress-width', percent);

    if (videoStates.isPlayVideo) {
      video.value.play();
    }

    new Promise((resolve, reject) => {
      resolve((videoStates.isActiveControlsAnimation = false));
    }).then(() => {
      videoStates.isActiveControlsAnimation = true;
    });

    videoStates.isRewind.enable = true;
    videoStates.isRewind.replay = true;
    videoStates.isRewind.forward = false;
  }
};

const onClickRewind = () => {
  rewindVideo(10);
};

const forwardVideo = (value: number) => {
  if (!videoStates.isEndedVideo) {
    video.value.currentTime += value;
    checkEndedVideo();

    const percent = video.value.currentTime / video.value.duration;
    progressBar.value.style.setProperty('--progress-width', percent);

    new Promise((resolve, reject) => {
      resolve((videoStates.isActiveControlsAnimation = false));
    }).then(() => {
      videoStates.isActiveControlsAnimation = true;
    });

    videoStates.isRewind.enable = true;
    videoStates.isRewind.replay = false;
    videoStates.isRewind.forward = true;
  }
};

const onClickForward = () => {
  forwardVideo(10);
};

const onMouseDownProgressBar = (e: any) => {
  videoStates.isScrubbingProgressBar = true;

  handleTimeUpdate(e);
};

const onMouseUpProgressBar = () => {
  videoStates.isScrubbingProgressBar = false;
  if (videoStates.isPlayVideo) {
    video.value.play();
  }
};

const onMouseMoveOverlayProgress = (e: any) => {};

const onMouseMoveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = true;
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  overlayProgress.value.style.setProperty('--preview-width', percent);

  if (videoStates.isScrubbingProgressBar) {
    handleTimeUpdate(e);
  } else {
    drawTimeLine(e);
  }
};

const drawTimeLine = (e: any) => {
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  timelineUpdate.value = formatDuration(percent * video.value.duration);

  const timeLinePosition = Math.max(0, e.x - rect.left);

  const timeLinePositionFinnal = Math.min(
    // Math.max(10, timeLinePosition - timeline.value.offsetWidth / 2 + 10),
    Math.max(0, timeLinePosition - timeline.value.offsetWidth / 2),
    overlayProgress.value.offsetWidth - timeline.value.offsetWidth //- 10
  );

  timeline.value.style.setProperty(
    '--timeline-position',
    timeLinePositionFinnal + 'px'
  );

  // videoTemp.value.currentTime = percent * videoTemp.value.duration;

  // const ctx = canvasPreviewImg.value.getContext('2d');

  // ctx.drawImage(video.value, 0, 0, 160, 100);

  // canvasPreviewImg.value.toBlob((blob: any) => {
  // const previewImg = timeline.value.querySelector(
  //   '.preview-img'
  // ) as HTMLImageElement;
  // previewImg.src = URL.createObjectURL(blob);
  // });

  // const img_url = canvasPreviewImg.value.toDataURL('image/jpeg');

  // const previewImg = timeline.value.querySelector(
  //   '.preview-img'
  // ) as HTMLImageElement;
  // previewImg.src = img_url;
};

const onClickFullScreen = () => {
  videoStates.isFullScreen = true;
  videoPlayer.value.requestFullscreen();
};

const onClickFullScreenExit = () => {
  videoStates.isFullScreen = false;
  document.exitFullscreen();
};

const onClickVolumeUp = () => {
  video.value.muted = true;
  videoStates.isVolumeOff = true;
};

const onClickVolumeOff = () => {
  video.value.muted = false;
  videoStates.isVolumeOff = false;
};

const onChangeVolume = (value: number) => {
  volume.value = value;
  video.value.volume = value / 100;
};

const onClickPictureInPicture = () => {
  video.value.requestPictureInPicture();
};

const onClickItemPlayback = (item: string) => {
  settings.playback.current = item;

  if (item == 'Bình thường') {
    video.value.playbackRate = 1;
  } else {
    video.value.playbackRate = +item;
  }
};

const onCloseSettings = () => {
  setTimeout(() => {
    settingStates.subSetting.enable = false;
    settingStates.subSetting.playback = false;
    settingStates.subSetting.quality = false;
  }, 150);
};

const onClickPlayAgain = () => {
  video.value.currentTime = 0;
  progressBar.value.style.setProperty('--progress-width', 0);
  videoStates.isShowNotify = false;
  video.value.play();
  videoStates.isPlayVideo = true;
};

const onClickKeepWatching = () => {
  video.value.currentTime = props.dataMovie?.history_progress?.seconds;
  progressBar.value.style.setProperty(
    '--progress-width',
    props.dataMovie?.history_progress?.percent
  );
  videoStates.isShowNotify = false;
  video.value.play();
  videoStates.isPlayVideo = true;
};

const onKeyDownVideo = (e: any) => {
  // show controls
  if ([32, 37, 39].includes(e.keyCode)) {
    videoStates.isShowControls = true;
    clearTimeout(timeOut.value);

    timeOut.value = setTimeout(() => {
      videoStates.isShowControls = false;
    }, 5000);
  }

  switch (e.keyCode) {
    case 32:
      e.preventDefault();

      if (videoStates.isPlayVideo) {
        pauseVideo();
      } else {
        playVideo();
      }
      break;
    case 37:
      rewindVideo(10);
      break;
    case 39:
      forwardVideo(10);
      break;
    case 77:
      if (videoStates.isVolumeOff) {
        video.value.muted = false;
        videoStates.isVolumeOff = false;
      } else {
        video.value.muted = true;
        videoStates.isVolumeOff = true;
      }
      break;
    case 70:
      if (videoStates.isFullScreen) {
        videoStates.isFullScreen = false;
        document.exitFullscreen();
      } else {
        videoStates.isFullScreen = true;
        videoPlayer.value.requestFullscreen();
      }
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" src="./VideoPlayer.scss"></style>
