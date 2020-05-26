<template>
  <div id="app">
    <img alt="Vue logo" :src="src.url" />
    <my-pre-view :dataRow="src" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import myPreView from "@/components/myPreview/myPreView";
export default {
  name: "App",
  components: {
    HelloWorld,
    myPreView
  },
  data() {
    return {
      src: {
        url: require("./assets/logo.png"),
        fileName: "./assets/logo.png",
        urlList:[
          require("./assets/logo.png"),
          require("./assets/用户信息.png"),
          require("./assets/timg.jpg")
        ],
      }
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
