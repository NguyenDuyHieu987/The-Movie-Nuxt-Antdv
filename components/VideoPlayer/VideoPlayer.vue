<template>
  <div
    class="video-player"
    ref="videoPlayer"
    :class="{
      scrubbing: videoStates.isScrubbingProgressBar,
      'hide-controls': videoStates.isHideControls,
      pause: !videoStates.isPlayVideo,
    }"
  >
    <div v-if="settingStates.switchBackgroud" class="overlay-backdrop">
      <nuxt-img :src="backdrop" loading="lazy" />
    </div>

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
      @keydown="onKeyDownVideo"
      @play="(e:any)=>
       emits('onPlay', {
        seconds:  e!.target!.currentTime,
        percent:  e!.target!.currentTime /  e!.target!.duration,
        duration:  e!.target!.duration
      })
      "
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>

    <div
      class="overlay-controls-animation"
      :class="{
        active: videoStates.isActiveControlsAnimation,
        replay: videoStates.isEndedVideo,
        rewind: videoStates.isRewind,
      }"
    >
      <div class="box-icon">
        <div v-show="!videoStates.isRewind.enable" class="play-pause">
          <Icon
            v-show="videoStates.isEndedVideo"
            name="ic:baseline-replay"
            class="replay"
            @click="onReplayVideo"
          />

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
      <div class="text">
        <span v-show="videoStates.isEndedVideo" @click="onReplayVideo"
          >Phát lại</span
        >
      </div>
    </div>

    <div class="controls" v-show="videoStates.isLoaded">
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
        @mouseleave="videoStates.isMouseMoveOverlayProgress = false"
        ref="overlayProgress"
      >
        <div class="progress-bar" ref="progressBar"></div>
      </div>

      <div class="main-controls">
        <div class="left">
          <div class="play-pause">
            <Icon
              v-show="videoStates.isEndedVideo"
              name="ic:baseline-replay"
              class="replay"
              @click="onReplayVideo"
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
const props = defineProps<{
  backdrop: string;
  videoUrl: string;
}>();

const emits = defineEmits<{
  onPlay: [e: any];
  onTimeUpdate: [e: any];
}>();

const videoPlayer = ref();
const video = ref();
const overlayProgress = ref();
const progressBar = ref();
const timeline = ref();
const canvasPreviewImg = ref();
const videoStates = reactive({
  isLoaded: false,
  isPlayVideo: false,
  isScrubbingProgressBar: false,
  isFullScreen: false,
  isVolumeOff: false,
  isEndedVideo: false,
  isMouseMoveOverlayProgress: false,
  isHideControls: false,
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
const interval = ref<any>();

onMounted(() => {
  video.value.volume = volume.value / 100;
  progressBar.value.style.setProperty('--progress-width', 0);

  window.onmouseup = () => {
    videoStates.isScrubbingProgressBar = false;
    if (videoStates.isPlayVideo) {
      video.value.play();
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

watch(props, () => {
  video.value.load();
  video.value.currentTime = 0;
  progressBar.value.style.setProperty('--progress-width', 0);

  if (videoStates.isPlayVideo) {
    video.value.play();
  } else {
    video.value.pause();
  }
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

  if (video.value.currentTime == video.value.duration) {
    videoStates.isEndedVideo = true;
  } else {
    videoStates.isEndedVideo = false;
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
  videoStates.isLoaded = true;
  duration.value = formatDuration(video.value.duration);
};

const timeUpdateVideo = (e: any) => {
  timeUpdate.value = formatDuration(e.target.currentTime);
  const percent = e.target.currentTime / e.target.duration;
  progressBar.value.style.setProperty('--progress-width', percent);

  emits('onTimeUpdate', {
    seconds: video.value?.currentTime,
    percent: video.value?.currentTime / video.value?.duration,
    duration: video.value?.duration,
  });
};

const mouseLeaveVideo = () => {
  clearTimeout(interval.value);

  videoStates.isHideControls = false;
};

const mouseMoveVideo = () => {
  if (videoStates.isPlayVideo) {
    videoStates.isHideControls = false;
    clearTimeout(interval.value);

    interval.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }
};

const onEndedVideo = () => {
  videoStates.isEndedVideo = true;
};

const onClickPlay = () => {
  videoStates.isPlayVideo = true;
  video.value.play();
};

const onClickPause = () => {
  videoStates.isPlayVideo = false;
  video.value.pause();
};

const onReplayVideo = () => {
  video.value.load();
  video.value.play();
  videoStates.isPlayVideo = true;
  videoStates.isEndedVideo = false;
};

const onClickVideo = () => {
  if (videoStates.isEndedVideo) {
    return;
  }

  if (videoStates.isPlayVideo) {
    video.value.pause();
    videoStates.isPlayVideo = false;

    // hide controls
    clearTimeout(interval.value);
    videoStates.isHideControls = false;
  } else {
    video.value.play();
    videoStates.isPlayVideo = true;

    // hide controls
    videoStates.isHideControls = false;
    clearTimeout(interval.value);

    interval.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

  videoStates.isRewind.enable = false;
};

const onClickReplay = () => {
  video.value.currentTime -= 10;

  const percent = video.value.currentTime / video.value.duration;
  progressBar.value.style.setProperty('--progress-width', percent);

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

  videoStates.isRewind.enable = true;
  videoStates.isRewind.replay = true;
  videoStates.isRewind.forward = false;
};

const onClickForward = () => {
  video.value.currentTime += 10;

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

const onMouseMoveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = true;
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  overlayProgress.value.style.setProperty('--preview-width', percent);

  drawTimeLine(e);

  if (videoStates.isScrubbingProgressBar) {
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

const onKeyDownVideo = (e: any) => {
  alert('G');
};
</script>

<style lang="scss" src="./VideoPlayer.scss"></style>
