<template>
  <div class="home">
    <main class="site-content has-sections" role="main" id="main" tabindex="-1">
      <section>
        <div class="wrapper">
          <p class="tagline">{{ $t("home.home_tagline") }}</p>
        </div>
        <div class="wrapper">
          <img src="/static/images/home-pic.jpg" style="margin-bottom:30px;" />
        </div>
      </section>
      <section class="togglable-blocks" id="hp-togglable-blocks">
        <div class="wrapper">
          <div class="tabs"></div>
          <br />
          <a href="products" class="btn">{{ $t("home.home_browse") }}</a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  mounted: async function () {
    var path =
      ".*/" + window.env.getLocaleFromUrl(window.location.href) + "($|/$)";
    var regExp = new RegExp(path);
    var isHomeUrl = window.location.pathname.match(regExp);
    if (isHomeUrl) {
      let activeProductsAndSolutions = await window.env.getFromApi(
        "web/activeProductsAndSolutions"
      );
      if (activeProductsAndSolutions) {
        this.addSolutionTabs(activeProductsAndSolutions);
      }
    }
  },

  methods: {
    addSolutionTabs: function (solutions) {
      for (let i in solutions) {
        let solution = solutions[i];
        this.addSolutionTab(i, solution);
      }
    },

    addSolutionTab: function (index, solution) {
      var tabId = "tab-" + index;
      var productLis = window.env.setProductLis(solution.products);

      $(".tabs").append(
        '<div class="tab"> \
        <input class="tab-radio" type="radio" id="' +
          tabId +
          '" name="tab-group-1" /> \
          <label class="tab-label" for="' +
          tabId +
          '"> \
        <div class="block"> \
          <div class="toggle"> \
            <span class="abbr"><img class="img" src="' +
          solution.icon +
          '"/></span> \
        <span class="title">' +
          window.env.htmlEncode(solution.name) +
          '</span> \
                  <span class="icon"></span> \
                </div> \
              </div> \
          </label> \
          <div class="tab-panel"> \
            <div class="tab-content"> \
              <ul class="list">' +
          productLis +
          "</ul> \
            </div> \
          </div> \
        </div>"
      );
    },
  },
};
</script>