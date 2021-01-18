<!--should be able to make this reusable, classes use IDS names, so should be able to delete style section when this project adopts those styles-->
<template>
  <transition name="modal-fade">
    <div class="modal-wrapper">
      <div class="modal-content" role="alertdialog" aria-model="true" aria-labelledby="message-title" aria-describedby="message-text">
        <header class="modal-header" id="message-title">
          <slot name="header">
            <i class="material-icons icon-error">error_outline</i><h1 class="modal-title">{{ $t("modal.modal_title_error_browser") }}</h1>
            <!--<button type="button" class="btn-close" @click="close" aria-label="close-modal">x</button>-->
          </slot>
        </header>
        <section class="modal-body" id="message-text">
          <slot name="body">
            <i18n path="modal.modal_message_ie" tag="p">
              <br />
            </i18n>
          </slot>
        </section>
        <!--<footer class="modal-footer">
          <slot name="footer">
            you could have text here
            <button type="button" class="btn" @click="close" aria-label="Close modal">
              OK
            </button>
          </slot>
        </footer>-->
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /*make modal display on top of other page elements*/
  }

  .modal-content {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 999; /*make modal display on top of other page elements*/
  }

  .modal-header,
  .modal-footer {
    padding: 20px;
    display: flex;
  }

  .modal-header {
    /*justify-content: space-between;*/
    text-align: left;
  }

  .icon-error {
    color:#DA1217;
    font-size: 36px;
  }

  .modal-title {
    padding: 5px;
  }
  
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 0px 30px 30px;
  }

  .btn-close {
    border: none;
    font-size: 24px;
    cursor: pointer;
    font-weight: bold;
    color: #2F2F32;
    background: transparent;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>