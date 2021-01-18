<template>
  <div class="topbanner">
    <header class="site-header" id="global-header" role="banner">
      <div class="nav-container">
        <div style="display: none"></div>
        <div class="secondary">
          <div class="utility-nav-container">
            <div class="wrapper">
              <nav class="site-utility-nav" id="utility-nav">
                <ul>
                  <li class="language">
                    <button
                      data-panel="language-panel"
                      class="click-track not_protected"
                      id="language-button"
                    >
                      <span>EN</span>
                    </button>
                  </li>
                  <li id="currentLanguage">
                    <span>EN</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="utility-panels">
            <div class="utility-panel language-panel" id="language-panel">
              <div class="wrapper">
                <div class="container" id="language-container">
                  <p class="panel-title">{{ $t("header.language.header_language_message") }}</p>
                  <ul class="languages clear">
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('en-us')"
                        @click="saveLocaleInLocalStorage('en-us')"
                      >
                        <span class="lang">EN</span>&nbsp;English
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('de-de')"
                        @click="saveLocaleInLocalStorage('de-de')"
                      >
                        <span class="lang">DE</span>&nbsp;Deutsch
                      </a>
                    </li>
                    <li class="end">
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('es-es')"
                        @click="saveLocaleInLocalStorage('es-es')"
                      >
                        <span class="lang">ES</span>&nbsp;Español
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('fr-fr')"
                        @click="saveLocaleInLocalStorage('fr-fr')"
                      >
                        <span class="lang">FR</span>&nbsp;Français
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('it-it')"
                        @click="saveLocaleInLocalStorage('it-it')"
                      >
                        <span class="lang">IT</span>&nbsp;Italiano
                      </a>
                    </li>
                    <li class="end">
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('ja-jp')"
                        @click="saveLocaleInLocalStorage('ja-jp')"
                      >
                        <span class="lang">JP</span>&nbsp;日本語
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('nl-nl')"
                        @click="saveLocaleInLocalStorage('nl-nl')"
                      >
                        <span class="lang">NL</span>&nbsp;Nederlands
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('pl-pl')"
                        @click="saveLocaleInLocalStorage('pl-pl')"
                      >
                        <span class="lang">PL</span>&nbsp;Polski
                      </a>
                    </li>
                    <li class="end">
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('pt-br')"
                        @click="saveLocaleInLocalStorage('pt-br')"
                      >
                        <span class="lang">BR</span>&nbsp;Português Brasil
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('ru-ru')"
                        @click="saveLocaleInLocalStorage('ru-ru')"
                      >
                        <span class="lang">RU</span>&nbsp;Pусский
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('sv-se')"
                        @click="saveLocaleInLocalStorage('sv-se')"
                      >
                        <span class="lang">SV</span>&nbsp;Svenska
                      </a>
                    </li>
                    <li class="end">
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('zh-cn')"
                        @click="saveLocaleInLocalStorage('zh-cn')"
                      >
                        <span class="lang">CN</span>&nbsp;简体中文
                      </a>
                    </li>
                    <li>
                      <a
                        class="not_protected"
                        :href="replaceLocaleInUrl('zh-tw')"
                        @click="saveLocaleInLocalStorage('zh-tw')"
                      >
                        <span class="lang">TW</span>&nbsp;繁體中文
                      </a>
                    </li>
                    <li></li>
                    <li class="end"></li>
                    <li></li>
                    <li class="end">
                      <hr v-if="isProductUrl()" />
                      <a class="not_protected" v-if="isProductUrl()" :href="setLocaleUrl()">
                        <span class="lang">All</span>
                        &nbsp;{{ $t("header.language.header_all_link") }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="primary">
          <div class="wrapper" id="top-navigation">
            <nav role="navigation" id="nav" class="site-nav">
              <div class="header-title">
                <a :href="homeUrl">{{ $t("header.header_doc_central") }}</a>
              </div>
              <ul>
                <li class="nav-item has-sub-menu nav-products">
                  <span>
                    <a href="#" class="not_protected">{{ $t("header.header_products") }}</a>
                  </span>
                  <div class="sub-menu" id="product-panel">
                    <button class="menu-toggle level-1 not_protected">Back</button>
                    <div class="col">
                      <p class="title">
                        <a :href="productsUrl">{{ $t("header.header_products_az") }}</a>
                      </p>
                    </div>
                  </div>
                </li>
                <li class="nav-item has-sub-menu nav-products">
                  <span>
                    <a href="#" class="not_protected">{{ $t("header.header_cloud") }}</a>
                  </span>
                  <div class="sub-menu">
                    <button class="menu-toggle level-1 not_protected">Back</button>
                    <ul id="cloudUl"></ul>
                  </div>
                </li>
                <li class="nav-item has-sub-menu nav-products">
                  <span>
                    <a href="#" class="not_protected">{{ $t("header.header_technology") }}</a>
                  </span>
                  <div class="sub-menu">
                    <button class="menu-toggle level-1 not_protected">Back</button>
                    <ul id="technologyUl"></ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div class="header-container">
        <div class="wrapper">
          <a href="http://www.infor.com/" class="infor-logo not_protected">Infor</a>
          <button class="nav-toggle not_protected" id="toggle-nav">
            Toggle navigation
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="doc-central not_protected">
          <a href="/">Documentation Central</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: window.env.getLocaleFromUrl(window.location.href),
      productsUrl:
        "/" + window.env.getLocaleFromUrl(window.location.href) + "/products",
      homeUrl: "/" + window.env.getLocaleFromUrl(window.location.href) + "/",
    };
  },

  mounted: async function () {
    var locale = window.env.getLocaleFromUrl(window.location.href);
    document.getElementById("currentLanguage").innerHTML = locale.toUpperCase();
    var activeProductsAndSolutions = await window.env.getFromApi(
      "web/activeProductsAndSolutions"
    );
    if (activeProductsAndSolutions) {
      this.addProductUls(activeProductsAndSolutions);
    }
  },

  methods: {
    replaceLocaleInUrl: function (locale) {
      var currentUrl = window.location.href;
      var newUrl = currentUrl.replace(
        /(.*\/)([a-z]{2}\-[a-z]{2})(.*)$/,
        "$1" + locale + "$3"
      );

      return newUrl;
    },

    saveLocaleInLocalStorage(locale) {
      this.$root.saveLocaleInLocalStorage(locale);
    },

    setLocaleUrl: function () {
      var currentUrl = window.location.href;
      var locale = window.env.getLocaleFromUrl(currentUrl);
      var localeUrl = "/" + locale + "/locale";

      return localeUrl;
    },

    isProductUrl: function () {
      var path = "/[a-z]{2}-[a-z]{2}/(?!error)(?!products)(?!locale)[a-z0-9]+(/[A-Za-z0-9-_.])*";
      var regExp = new RegExp(path);
      var isProductUrl = window.location.pathname.match(regExp);

      return isProductUrl;
    },

    addProductUls: function (solutions) {
      for (let i in solutions) {
        const solution = solutions[i];
        const solutionId = solution.solution_id;
        const solutionName = solution.name;

        if (solutionId === 2){
          this.addProductUl("#cloudUl", solution.products);
        }
        else if (solutionId === 3){
          this.addProductUl("#technologyUl", solution.products);
        }
      }
    },

    addProductUl: function (selector, products) {
      var productLis = window.env.setProductLis(products);
      $(selector).append(productLis);
    },
  },
};
</script>