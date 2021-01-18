<template>
  <div class="error">
    <div class="content">
      <main class="site-content has-sections" role="main" id="main" tabindex="-1">
        <section class="page-404-container">
          <div class="wrapper">
            <div class="page-404-header">
              <br />
              <h1>Error {{errorCode}}</h1>
              <h2>{{ $t(errorMessage) }}</h2>
              <p class="fade">{{ previousUrl }}</p>
              <br />
              <br />
              <h2>
                <a class="btn" :href="homeUrl">{{ $t("error.error_to_homepage") }}</a>
              </h2>
            </div>
            <div class="page-404-content">
              <p>
                {{ $t("error.error_contact_pre_link") }}
                <a
                  href="mailto:documentation@infor.com"
                >{{ $t("error.error_contact_linktext") }}</a>
                {{ $t("error.error_contact_post_link") }}
              </p>
              <br />
              <br />
              <br />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorCode: this.$route.params.errorCode,
      homeUrl: "/" + window.env.getLocaleFromUrl(window.location.href) + "/",
      previousUrl: document.referrer
    };
  },
  
  computed: {
    errorMessage: function() {
      switch (this.errorCode) {
        case "401":
          return "error.error_message_401";
          break;
        case "403":
          return "error.error_message_403";
          break;
        case "404":
          return "error.error_message_404";
          break;
        case "500":
          return "error.error_message_500";
          break;
      }
    }
  }
};
</script>

<style>
.fade {
  opacity: 0.8;
  filter: alpha(opacity=80);
}
</style>
