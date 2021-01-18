import Vue from "vue"
import VueRouter from "vue-router"
import VueI18n from "vue-i18n"
import Jwt from "jsonwebtoken"
import browserDetect from "vue-browser-detect-plugin"

import App from './App.vue'
import Home from './components/Home.vue'
import Products from './components/Products.vue'
import Product from './components/Product.vue'
import Locale from './components/Locale.vue'
import Error from './components/Error.vue'
import HealthCheck from './components/HealthCheck.vue'

import english from "./language_files/docs_ui.json"
import german from "./language_files/docs_ui_de.json"
import spanish from "./language_files/docs_ui_es.json"
import french from "./language_files/docs_ui_fr.json"
import italian from "./language_files/docs_ui_it.json"
import japanese from "./language_files/docs_ui_ja.json"
import dutch from "./language_files/docs_ui_nl.json"
import polish from "./language_files/docs_ui_pl.json"
import brazilian from "./language_files/docs_ui_pt-br.json"
import russian from "./language_files/docs_ui_ru.json"
import swedish from "./language_files/docs_ui_sv.json"
import chinese_simpl from "./language_files/docs_ui_zh-cn.json"
import chinese_trad from "./language_files/docs_ui_zh-tw.json"

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(browserDetect);

var savedToken = sessionStorage.getItem("token");
if (savedToken !== null) {
  let token = Jwt.decode(savedToken);
  if (token) {
    sessionStorage.setItem("expiration", (token.exp) * 1000);
  }  
}

const en_us = "en-us";
var locale = en_us;
try {
  locale = window.localStorage.getItem("locale");
  if (!locale) {
    locale = en_us;
  }
} catch (SecurityError) {
  this.localStorageEnabled = false;
}

var messages = {
  "en-us": english,
  "de-de": german,
  "es-es": spanish,
  "fr-fr": french,
  "it-it": italian,
  "ja-jp": japanese,
  "nl-nl": dutch,
  "pl-pl": polish,
  "pt-br": brazilian,
  "ru-ru": russian,
  "sv-se": swedish,
  "zh-cn": chinese_simpl,
  "zh-tw": chinese_trad
}

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: en_us,
  silentTranslationWarn: true,
  messages
})

const localePath = "/" + locale;
const localePathRegex = "/:locale([a-z]{2}-[a-z]{2})";
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/healthcheck", 
      component: HealthCheck
    },
    // URLs with locale
    {
      path: localePathRegex + "/locale",
      component: Locale
    },
    {
      path: localePathRegex + "/error/:errorCode",
      component: Error
    },
    {
      path: localePathRegex,
      component: Home
    },
    {
      path: localePathRegex + "/",
      component: Home
    },
    {
      path: localePathRegex + "/products",
      component: Products
    },
    {
      path: localePathRegex + "/:productShortname([a-z0-9]+)/:docVersion?",
      component: Product
    },

    // Redirect
    {
      path: "/locale",
      redirect: localePath + "/locale"
    },
    {
      path: "/error/:errorCode",
      redirect: localePath + "/error/:errorCode"
    },
    {
      path: "/products",
      redirect: localePath + "/products"
    },
    {
      path: "/:productShortname([a-z0-9]+)/:docVersion?",
      redirect: localePath + "/:productShortname/:docVersion?"
     },
    //catch all
    {
      path: "/:catchAll(.*)",
      redirect: localePath
    }
  ]
})

new Vue({
  i18n,
  el: "#app",
  router: router,
  render: h => h(App),
  data() {
    return {
      localStorageEnabled: true,
      alphabet: "#ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
  },

  methods: {
    saveLocaleInLocalStorage: function(locale) {
      this.$i18n.locale = locale;
      if (this.localStorageEnabled) {
        window.localStorage.setItem("locale", locale);
      }
    },
  }
})
