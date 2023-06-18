<template>
  <div
    class="video-player"
    ref="videoPlayer"
    :class="{
      scrubbing: isScrubbingProgressBar,
      'hide-controls': isHideControls,
    }"
  >
    <video
      id="video-player"
      ref="video"
      preload="metadata"
      :poster="backdrop"
      @click="onClickVideo"
      @loadeddata="loadedDataVideo"
      @timeupdate="timeUpdateVideo"
      @mousemove="mouseMoveVideo"
      @mouseleave="mouseLeaveVideo"
      @ended="onEndedVideo"
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>

    <div
      class="overlay-controls-animation"
      :class="{ active: isActiveControlsAnimation }"
    >
      <Icon
        v-if="isEndedVideo"
        name="ic:baseline-replay"
        class="replay"
        @click="onReplayVideo"
      />

      <Icon
        v-if="!isPlayVideo && !isEndedVideo"
        name="ic:play-arrow"
        class="play"
        @click="onClickPlay"
      />

      <Icon
        v-else-if="isPlayVideo && !isEndedVideo"
        name="ic:baseline-pause"
        class="play"
        @click="onClickPause"
      />
    </div>

    <div class="controls" v-show="!loading">
      <div
        class="timeline"
        :class="{
          active: isMouseMoveOverlayProgress || isScrubbingProgressBar,
        }"
        ref="timeline"
      >
        <div class="timeline-container">
          <div class="img-box">
            <img class="preview-img" />
            <canvas class="canvas-preview-img" ref="canvasPreviewImg"></canvas>
          </div>
        </div>
        <span class="timeline-indicator">{{ timelineUpdate }} </span>
      </div>

      <div
        class="overlay-progress"
        @mousemove="onMouseMoveProgressBar"
        @mousedown="onMouseDownProgressBar"
        @mouseup="onMouseUpProgressBar"
        @mouseleave="isMouseMoveOverlayProgress = false"
        ref="overlayProgress"
      >
        <div class="progress-bar" ref="progressBar"></div>
      </div>

      <div class="main-controls">
        <div class="left">
          <div class="play-pause">
            <Icon
              v-if="isEndedVideo"
              name="ic:baseline-replay"
              class="replay"
              @click="onReplayVideo"
            />

            <Icon
              v-if="!isPlayVideo && !isEndedVideo"
              name="ic:play-arrow"
              class="play"
              @click="onClickPlay"
            />

            <Icon
              v-else-if="isPlayVideo && !isEndedVideo"
              name="ic:baseline-pause"
              class="play"
              @click="onClickPause"
            />
          </div>

          <div class="replay-forward">
            <Icon
              name="ic:baseline-replay-10"
              class="replay"
              @click="onClickReplay"
            />
            <Icon
              name="ic:baseline-forward-10"
              class="forward"
              @click="onClickForward"
            />
          </div>
          <div class="volume">
            <div>
              <Icon
                v-if="!isVolumeOff && volume <= 30"
                name="ic:baseline-volume-down"
                class="fullscreen"
                @click="onClickVolumeUp"
              />

              <Icon
                v-if="!isVolumeOff && volume > 30"
                name="ic:baseline-volume-up"
                @click="onClickVolumeUp"
              />

              <Icon
                v-else-if="isVolumeOff"
                name="ic:baseline-volume-off"
                @click="onClickVolumeOff"
              />
            </div>
            <a-slider
              class="volume-slider"
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
          <div class="setting">
            <Icon name="ic:baseline-settings" class="setting" />
          </div>

          <div class="picture-in-picture">
            <Icon
              name="ic:baseline-picture-in-picture-alt"
              @click="onClickPictureInPicture"
            />
          </div>

          <div class="fullscreen-exit">
            <Icon
              v-if="!isFullScreen"
              name="ic:baseline-fullscreen"
              class="fullscreen"
              @click="onClickFullScreen"
            />

            <Icon
              v-else
              name="ic:baseline-fullscreen-exit"
              @click="onClickFullScreenExit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clearInterval } from 'timers';

const props = defineProps<{
  backdrop: string;
  videoUrl: string;
  loading?: boolean;
}>();

const videoPlayer = ref();
const video = ref();
const overlayProgress = ref();
const progressBar = ref();
const timeline = ref();
const canvasPreviewImg = ref();
const isPlayVideo = ref<boolean>(false);
const isScrubbingProgressBar = ref<boolean>(false);
const isFullScreen = ref<boolean>(false);
const isVolumeOff = ref<boolean>(false);
const isEndedVideo = ref<boolean>(false);
const isMouseMoveOverlayProgress = ref<boolean>(false);
const isHideControls = ref<boolean>(false);
const isActiveControlsAnimation = ref<boolean>(false);
const volume = ref<number>(70);
const timeUpdate = ref<string>('00:00');
const timelineUpdate = ref<string>('00:00');
const duration = ref<string>('00:00');
const interval = ref<any>();

onMounted(() => {
  video.value.volume = volume.value / 100;
  progressBar.value.style.setProperty('--progress-width', 0);

  window.onmouseup = () => {
    isScrubbingProgressBar.value = false;
  };

  window.onmousemove = (e) => {
    if (isScrubbingProgressBar.value) {
      handleTimeUpdate(e);
    }
  };
});

watch(volume, () => {
  isVolumeOff.value = video.value.volume == 0;
});

const handleTimeUpdate = (e: any) => {
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  progressBar.value.style.setProperty('--progress-width', percent);

  video.value.currentTime = percent * video.value.duration;

  if (video.value.currentTime == video.value.duration) {
    isEndedVideo.value = true;
  } else {
    isEndedVideo.value = false;
  }

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

const loadedDataVideo = () => {
  duration.value = formatDuration(video.value.duration);
};

const timeUpdateVideo = (e: any) => {
  timeUpdate.value = formatDuration(e.target.currentTime);
  timelineUpdate.value = formatDuration(e.target.currentTime);
  const progressWidth = e.target.currentTime / e.target.duration;
  progressBar.value.style.setProperty('--progress-width', progressWidth);
};

const mouseLeaveVideo = () => {
  clearTimeout(interval.value);

  isHideControls.value = false;
};

const mouseMoveVideo = () => {
  isHideControls.value = false;

  clearTimeout(interval.value);
  interval.value = setTimeout(() => {
    isHideControls.value = true;
  }, 5000);
};

const onEndedVideo = () => {
  isEndedVideo.value = true;
};

const onClickPlay = () => {
  isPlayVideo.value = true;
  video.value.play();
};

const onClickPause = () => {
  isPlayVideo.value = false;
  video.value.pause();
};

const onReplayVideo = () => {
  video.value.load();
  video.value.play();
  isEndedVideo.value = false;
};

const onClickVideo = () => {
  if (isPlayVideo.value) {
    video.value.pause();
    isPlayVideo.value = false;

    isActiveControlsAnimation.value = false;
  } else {
    video.value.play();
    isPlayVideo.value = true;

    isActiveControlsAnimation.value = true;
  }
};

const onClickReplay = () => {
  video.value.currentTime -= 10;

  const percent = video.value.currentTime / video.value.duration;
  progressBar.value.style.setProperty('--progress-width', percent);
};

const onClickForward = () => {
  video.value.currentTime += 10;

  const percent = video.value.currentTime / video.value.duration;
  progressBar.value.style.setProperty('--progress-width', percent);
};

const onMouseDownProgressBar = (e: any) => {
  isScrubbingProgressBar.value = true;

  handleTimeUpdate(e);
};

const onMouseUpProgressBar = () => {
  isScrubbingProgressBar.value = false;
};

const onMouseMoveProgressBar = (e: any) => {
  isMouseMoveOverlayProgress.value = true;
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  overlayProgress.value.style.setProperty('--preview-width', percent);

  drawTimeLine(e);

  if (isScrubbingProgressBar.value) {
    handleTimeUpdate(e);
  }
};

const drawTimeLine = (e: any) => {
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  const timeLinePosition = Math.max(0, e.x - rect.left);

  const timeLinePositionFinnal = Math.min(
    Math.max(10, timeLinePosition - timeline.value.offsetWidth / 2 + 10),
    overlayProgress.value.offsetWidth - (timeline.value.offsetWidth - 10)
  );

  timelineUpdate.value = formatDuration(percent * video.value.duration);

  timeline.value.style.setProperty(
    '--timeline-position',
    timeLinePositionFinnal + 'px'
  );

  // video.value.currentTime = percent * video.value.duration;

  canvasPreviewImg.value.width = 160;
  canvasPreviewImg.value.height = 100;

  const ctx = canvasPreviewImg.value.getContext('2d');
  ctx.drawImage(video.value, 0, 0, 160, 100);

  // const img_url = canvasPreviewImg.value.toDataURL('image/jpeg');

  // const previewImg = timeline.value.querySelector(
  //   '.preview-img'
  // ) as HTMLImageElement;
  // previewImg.src = img_url;
};

const onClickFullScreen = () => {
  isFullScreen.value = true;
  videoPlayer.value.requestFullscreen();
};

const onClickFullScreenExit = () => {
  isFullScreen.value = false;
  document.exitFullscreen();
};

const onClickVolumeUp = () => {
  video.value.muted = true;
  isVolumeOff.value = true;
};

const onClickVolumeOff = () => {
  video.value.muted = false;
  isVolumeOff.value = false;
};

const onChangeVolume = (value: number) => {
  volume.value = value;
  video.value.volume = value / 100;
};

const onClickPictureInPicture = () => {
  video.value.requestPictureInPicture();
};
</script>

<style lang="scss" src="./VideoPlayer.scss"></style>
