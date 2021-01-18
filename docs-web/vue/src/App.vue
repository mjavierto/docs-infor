<template>
  <div id="app">
    <div id="container" aria-hidden="true">
      <!--<button type="button" class="btn" @click="showModal">Test Modal!</button>-->
      <Modal v-if="$browserDetect.isIE === true" v-show="showModal"/>
      <Infordocsheader></Infordocsheader>
      <router-view></router-view>
      <Infordocsfooter></Infordocsfooter>
    </div>
  </div>
</template>

<script>
import Modal from "./components/Modal";
import Infordocsheader from "./components/Infordocsheader";
import Infordocsfooter from "./components/Infordocsfooter";

export default {
  name: "app",
  components: {
    Modal,
    Infordocsheader,
    Infordocsfooter
  },
  data () {
      return {
        isModalVisible: false,
      };
  },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
  },
};
</script>