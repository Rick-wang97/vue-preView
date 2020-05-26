<template>
  <div class="root">
    <el-button @click="previewPdf(dataRow)" type="text" size="small">预览</el-button>

    <div class="images" v-viewer="{ navbar: false}">
      <img v-for="(src,index) in images" style="width: 100%" :src="src" :key="index" hidden />
    </div>

    <el-dialog
      :visible="showDoc == true || showPdf == true  || showVideo == true"
      :show-close="true"
      :width="'80%'"
      class="dialog-div-pre-style"
      :before-close="closePreviewClick"
      center
    >
      <div v-if="showDoc == true" class="dialog-body-content-base-style">
        <iframe
          frameborder="0"
          :src="'https://view.officeapps.live.com/op/view.aspx?src=' + this.fileUrl"
          width="100%"
        ></iframe>
      </div>
      <div
        v-else-if="showPdf == true"
        class="dialog-body-content-base-style"
        style="justify-content: center; align-items: center"
      >
        <embed :src="pdfUrl" style="width: 100%; height: 100%" />
      </div>
      <div
        v-else-if="showVideo == true"
        class="dialog-body-content-base-style"
        style="justify-content: center; align-items: center"
      >
        <video-player
          class="video-player vjs-custom-skin"
          ref="positiveVideoPlayer"
          :playsinline="true"
          :options="positivePlayerOptions"
        ></video-player>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  nama: "myPreView",
  data() {
    return {
      showDoc: false,
      showPdf: false,
      showVideo: false,
      fileUrl: "",
      images: [],
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      pdfUrl: "",
      scale: 1.0,
      /**
       *播放器配置
       */
      positivePlayerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "" //视频url地址
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        },
        common: "positivePlayer"
      }
    };
  },
  props: {
    dataRow: {}
  },
  methods: {
    /**
     * pdf预览
     */
    previewPdf(row) {
      let type = this.iconByType(row);
      this.fileUrl = row.url;
      if (
        type.indexOf("doc") != -1 ||
        type.indexOf("docx") != -1 ||
        type.indexOf("xsl") != -1 ||
        type.indexOf("xslx") != -1
      ) {
        this.showDoc = true;
      } else if (type.indexOf("pdf") != -1) {
        this.pdfUrl =
          "http://47.105.218.26:8888/group1/M00/00/00/rB-LJlzT042AbKdCAAiu_35Yccs182.pdf";
        this.showPdf = true;
      } else if (
        type.indexOf("jpg") != -1 ||
        type.indexOf("png") != -1 ||
        type.indexOf("jpeg") != -1
      ) {
        this.images = row.urlList;
        const viewer = this.$el.querySelector(".images").$viewer;
        viewer.show();
      } else if (
        type.indexOf("avi") != -1 ||
        type.indexOf("mp4") != -1 ||
        type.indexOf("webm") != -1 ||
        type.indexOf("m4v") != -1 ||
        type.indexOf("rmvb") != -1 ||
        type.indexOf("mpg") != -1 ||
        type.indexOf("3gp") != -1 ||
        type.indexOf("swf") != -1 ||
        type.indexOf("mkv") != -1
      ) {
        this.positivePlayerOptions.sources[0].src =
          "//nos.netease.com/vod163/demo.mp4";
        this.positivePlayerOptions.sources[0].type = "video/mp4";
        this.showVideo = true;
      } else {
        this.$message("当前文件暂不支持预览");
      }
      // this.showPdf = true
    },
    /**
     * 通过文件后缀返回文件的图标
     */
    iconByType(row) {
      return row.fileName.substring(
        row.fileName.lastIndexOf(".") + 1,
        row.fileName.length
      );
    },
    closePreviewClick() {
      if (this.showDoc == true) {
        this.showDoc = false;
      } else if (this.showPdf == true) {
        this.showPdf = false;
      } else if (this.showVideo == true) {
        this.showVideo = false;
      }
    }
  }
};
</script>