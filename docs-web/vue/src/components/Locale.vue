<template>
  <div class="product">
    <main class="site-content has-sections" role="main" id="main" tabindex="-1">
      <div class="page-content-header">
        <div class="header-container">
          <div class="wrapper">
            <div class="container">
              <div class="title">
                <h1 class="page-title">{{ $t("locale.locale_select_message") }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchpage">
        <section class="productline-alpha">
          <div class="wrapper">
            <h1>{{ $t("locale.locale_title") }}</h1>
            <ul class="breadCrumb">
              <li>
                <a href="/">{{ $t("locale.locale_home") }}</a>
              </li>
              <li>/</li>
              <li>{{ $t("locale.locale_lang_az") }}</li>
            </ul>
            <div class="clearfix"></div>
            <h1 id="nav-links" class="nav-links">
              <a
                :href="'#'+letter.toLowerCase()"
                v-for="letter in alphabet"
                :key="letter"
              >{{ letter }}</a>
            </h1>
          </div>
        </section>
        <section>
          <div class="wrapper">
            <ul id="list" class="search-item">
              <li v-for="letter in alphabet" v-if="letter in languageGroups" :key="letter">
                <h3>
                  <p v-bind:id="letter.toLowerCase()" class="section">{{ letter }}</p>
                </h3>
                <ul>
                  <li
                    class="section"
                    v-for="language in languageGroups[letter]"
                    :key="language.english_name"
                  >
                    <a
                      :href="setProductLocaleUrl(language.language)"
                      @click="saveLocaleInLocalStorage(language.language)"
                    >{{ language.english_name + " (" + language.native_name + ")"}}</a>
                    <a href="#" class="to-top">back to top</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alphabet: this.$root.alphabet,
      languageGroups: {},
    };
  },

  created: async function () {
    var languages = await window.env.getFromApi("languages");
    if (languages) {
      this.setLanguageGroups(languages);
    }
  },

  methods: {
    setProductLocaleUrl: function (locale) {
      var productLocaleUrl = "";
      if (document.referrer !== "") {
        let previousUrl = document.referrer;
        productLocaleUrl = previousUrl.replace(
          /(.*\/)([a-z]{2}\-[a-z]{2})(.*)$/,
          "$1" + locale + "$3"
        );
      } else {
        let currentUrl = window.location.href;
        productLocaleUrl = currentUrl.replace(
          /(.*\/)([a-z]{2}\-[a-z]{2})(.*)$/,
          "$1" + locale + "$3"
        );
      }

      return productLocaleUrl;
    },

    saveLocaleInLocalStorage: function (locale) {
      this.$root.saveLocaleInLocalStorage(locale);
    },

    setLanguageGroups: function (languages) {
      var languageGroups = this.groupByLetters(languages);
      var sortedLanguageGroups = this.sortByEnglishName(languageGroups);
      this.languageGroups = sortedLanguageGroups;
    },

    groupByLetters: function (languages) {
      // An array of languages grouped by their first letters (A-Z)
      var languageGroups = {};
      for (var i in languages) {
        var language = languages[i];
        var languageEnglishName = language.english_name;
        var upperCasedLetter = languageEnglishName
          .substring(0, 1)
          .toUpperCase();
        if (!(upperCasedLetter in languageGroups)) {
          languageGroups[upperCasedLetter] = [];
        }
        languageGroups[upperCasedLetter].push(language);
      }

      return languageGroups;
    },

    sortByEnglishName: function (languageGroups) {
      // Sort languageGroups within each letter by english_name
      for (var letter in languageGroups) {
        languageGroups[letter] = languageGroups[letter].sort(this.compare);
      }

      return languageGroups;
    },

    compare: function (a, b) {
      // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
      if (a.english_name < b.english_name) {
        return -1;
      } else if (a.english_name > b.english_name) {
        return 1;
      } else {
        return 0;
      }
    },
  },
};
</script>
