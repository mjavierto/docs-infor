<template>
  <div class="product">
    <main class="site-content has-sections" role="main" id="main" tabindex="-1">
      <div class="page-content-header">
        <div class="header-container">
          <div class="wrapper">
            <div class="container">
              <div class="title">
                <h1 class="page-title">{{ productLongname }}</h1>
              </div>
              <div class="version-wrapper">
                <label>{{ $t("product.product_version") }}:</label>
                <select class="dropdown" v-model="docVersionName">
                  <option
                    v-for="productVersion in productVersions"
                    v-bind:key="productVersion.doc_version_name"
                  >
                    {{ productVersion.doc_version_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchpage">
        <section class="productline-alpha">
          <div class="wrapper">
            <ul class="breadCrumb">
              <li>
                <a href="/">{{ $t("product.product_home") }}</a>
              </li>
              <li>/</li>
              <li>{{ productLongname }}</li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </section>
        <section>
          <div class="wrapper">
            <div class="c-2-1">
              <div class="col">
                <div class="col-wrapper">
                  <ul class="product-item">
                    <li class="section">
                      <h3>
                        {{ productLongname }}
                        {{ $t("product.product_title_text") }}
                        {{ docVersionName }}
                      </h3>
                      <p id="languageContentNotAvailable" style="display: none">
                        {{ $t("product.product_language_not_available") }}
                      </p>
                      <table class="ui-table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>{{ $t("product.product_title_column") }}</th>
                            <th>{{ $t("product.product_language_column") }}</th>
                            <th>{{ $t("product.product_date_column") }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="content in contents"
                            v-bind:key="content.content_id"
                          >
                            <td>
                              <i
                                class="material-icons"
                                v-if="content.audience === 'customer_secured'"
                                style="padding: 8px 4px"
                                >vpn_key</i
                              >
                            </td>
                            <td>
                              <a :href="'/' + content.content_url">{{
                                content.pubtitle
                              }}</a>
                            </td>
                            <td>
                              {{
                                localeAndEnglish[content.language].nativeName
                              }}
                            </td>
                            <td>{{ content.publish_date.split(" ")[0] }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p></p>
                      <p>
                        {{ $t("product.product_add_info_pre_link") }}
                        <a
                          href="https://support.infor.com/espublic/en/AnswerLinkDotNet/SoHo/DocLink/SoHoDocLink.aspx"
                          >Infor Support Portal</a
                        >
                        {{ $t("product.product_add_info_post_link") }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          class="standard-band image-bg light-fg full-width trackable"
          id="on-premises"
          style="
            background-image: url('../../static/images/cityscape-onpremise-bg.jpg');
          "
        >
          <div class="wrapper">
            <h2>{{ $t("product.product_demo_header") }}</h2>
            <div class="text-wrapper">
              <p>{{ $t("product.product_demo_text") }}</p>
              <p>
                <!--if locale is en-us, display survey text and link instead of demo text and link. To change back, remove v-if and v-else-if-->
                <!--original en-us values: "product_demo_header": "Want a demo?", "product_demo_text": "Explore our end-to-end industry solutions in the Product Demo Center.",
                "product_demo_button": "Learn more ›"-->
                <a
                  v-if="locale == 'en-us'"
                  href="https://infor.gainsightcloud.com/v1/sites/survey/SurveyResponse?at=1I0025DXE6KKG8JCV1GPBST58CFFNC8XY5W0"
                  class="btn not_protected"
                  target="_self"
                  >{{ $t("product.product_demo_button") }}</a
                >
                <a
                  v-else-if="locale != 'en-us'"
                  href="https://www.infor.com/resources?type=demos"
                  class="btn not_protected"
                  target="_self"
                  >{{ $t("product.product_demo_button") }}</a
                >
              </p>
            </div>
          </div>
        </section>
        <section>
          <div>
            <p>&nbsp;</p>
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
      english: "en-us",
      localeAndEnglish: {},
      productShortname: this.$route.params.productShortname,
      productCode: "",
      productLongname: "",
      productVersions: {},
      locale: this.$route.params.locale,
      docVersion: this.$route.params.docVersion,
      docVersionName: "",
      contentIds: [],
      contents: [],
      localeContents: [],
      englishContents: [],
    };
  },

  created: function () {
    this.setLocaleAndEnglish();
    this.setProductCode(this.productShortname);
  },

  watch: {
    productCode: function () {
      var notEmpty = this.productCode !== "";
      if (notEmpty) {
        this.setProductLongname(this.productCode);
        this.setProductVersions(this.productCode);
      }
    },

    productVersions: function () {
      this.setDocVersionName(this.docVersion, this.productVersions);
    },

    docVersionName: function () {
      this.setDocVersion(this.docVersionName, this.productVersions);

      this.setContentIds(this.productCode, this.docVersion, this.locale);

      window.history.pushState(
        "",
        "",
        "/" + this.locale + "/" + this.productShortname + "/" + this.docVersion
      );
    },

    locale: function () {
      this.setLocaleAndEnglish();
      this.setContentIds(this.productCode, this.docVersion, this.locale);
    },

    contentIds: function () {
      this.setContents(this.contentIds);
    },

    contents: function () {
      if (this.contents.length !== this.localeContents.length) {
        document.getElementById("languageContentNotAvailable").style.display =
          "inline";
      }
    },
  },

  methods: {
    setLocaleAndEnglish: async function () {
      /*
      TODO for API (MTDOCS-936): 
      Add /languages/:language endpoint to just get locale and en-us languages.
      */
      var languages = await window.env.getFromApi("languages");
      if (languages) {
        for (let i in languages) {
          let language = languages[i];
          if (
            language.language === this.locale ||
            language.language === this.english
          ) {
            this.localeAndEnglish[language.language] = {
              nativeName: language.native_name,
              englishName: language.english_name,
            };
          }
        }
      } else {
        this.localeAndEnglish = {};
      }
    },

    setProductCode: async function (productShortname) {
      var productCode = await window.env.getFromApi(
        "web/productCodeFromProductShortname/" + productShortname
      );
      if (productCode) {
        this.productCode = productCode;
      } else {
        this.productCode = "";
        window.location.href = "/" + this.locale + "/error/404";
      }
    },

    setProductLongname: async function (productCode) {
      var productLongname = await window.env.getFromApi(
        "web/productLongname/" + productCode
      );
      if (productLongname) {
        this.productLongname = productLongname;
      } else {
        this.productLongname = "";
      }
    },

    setProductVersions: async function (productCode) {
      var productVersions = await window.env.getFromApi(
        "productVersions/search/findByProductCodeAndActiveTrueOrderByPositionAsc/" +
          productCode
      );
      if (productVersions) {
        this.productVersions = productVersions.map(
          ({ doc_version, doc_version_name }) => ({
            doc_version,
            doc_version_name,
          })
        );
      } else {
        this.productVersions = {};
      }
    },

    setDocVersionName: function (docVersion, productVersions) {
      /*
      In case of /:locale/:productShortname, docVersion is undefined. 
      Set docVersionName with that of the first productVersion. 
      Otherwise, set it with that of the productVersion with the same docVersion.
      */
      if (docVersion === undefined) {
        let productVersion = productVersions[0];
        this.docVersionName = productVersion.doc_version_name;
      } else {
        this.docVersionName = this.searchDocVersionName(
          docVersion,
          productVersions
        );
      }
    },

    searchDocVersionName: function (docVersion, productVersions) {
      var docVersionName = "";
      for (let i in productVersions) {
        let productVersion = productVersions[i];
        if (productVersion.doc_version === docVersion) {
          docVersionName = productVersion.doc_version_name;
          break;
        }
      }

      if (docVersionName) {
        return docVersionName;
      } else {
        window.location.href = "/" + this.locale + "/error/404";
      }
    },

    setDocVersion: function (docVersionName, productVersions) {
      for (let i in productVersions) {
        let productVersion = productVersions[i];
        if (productVersion.doc_version_name === docVersionName) {
          this.docVersion = productVersion.doc_version;
          return;
        }
      }
    },

    setContentIds: async function (productCode, docVersion, locale) {
      var productVersionLanguageId =
        productCode + "_" + docVersion + "_" + locale;
      var contentIds = await this.getContentIds(productVersionLanguageId);

      if (locale !== this.english) {
        let productVersionLanguageId =
          productCode + "_" + docVersion + "_" + this.english;
        let englishContentIds = await this.getContentIds(
          productVersionLanguageId
        );

        if (contentIds) {
          for (const englishContentId of englishContentIds) {
            contentIds.push(englishContentId);
          }
        } else {
          contentIds = englishContentIds;
        }
      }
      this.contentIds = contentIds;
    },

    getContentIds: async function (productVersionLanguageId) {
      var productVersionLanguageContents = await window.env.getFromApi(
        "productVersionLanguageContents/" + productVersionLanguageId
      );
      if (productVersionLanguageContents) {
        let contentIds = productVersionLanguageContents.map(
          ({ content_id }) => content_id
        );
        return contentIds;
      }
    },

    setContents: async function (contentIds) {
      var contents = await this.initializeContents(contentIds);
      this.setLocaleAndEnglishContents(contents);
      this.contents = this.refineContents(
        this.localeContents,
        this.englishContents
      );
    },

    initializeContents: async function (contentIds) {
      var contents = [];
      for (const contentId of contentIds) {
        let content = await this.getContent(contentId);
        if (content) {
          contents.push(content);
        }
      }

      return contents;
    },

    getContent: async function (contentId) {
      /* 
      TODO for API (MTDOCS-928):
      1. Endpoint should be /contents/:contentId
      2. Response data should be an object rather than an array
      */
      var content = await window.env.getFromApi(
        "contents/search/findByContentId/" + contentId
      );
      if (content) {
        if (content.active) {
          content = (({
            content_id,
            content_url,
            language,
            publish_date,
            pubtitle,
            audience,
          }) => ({
            content_id,
            content_url,
            language,
            publish_date,
            pubtitle,
            audience,
          }))(content);

          return content;
        }
      }
    },

    setLocaleAndEnglishContents: function (contents) {
      this.localeContents = [];
      this.englishContents = [];
      for (const content of contents) {
        if (content.language === this.locale) {
          this.localeContents.push(content);
        } else {
          this.englishContents.push(content);
        }
      }
    },

    refineContents: function (localeContents, englishContents) {
      var contents = [];
      if (localeContents.length === 0) {
        for (const englishContent of englishContents) {
          contents.push(englishContent);
        }
        return contents;
      } else {
        for (const localeContent of localeContents) {
          contents.push(localeContent);
        }
      }

      for (let i = 0; i < englishContents.length; i++) {
        let englishContent = englishContents[i];
        let englishContentId = englishContent.content_id;
        let localeCounterpartContentId = englishContentId.replace(
          "en-us",
          this.locale
        );
        for (let j = 0; j < localeContents.length; j++) {
          if (localeContents[j].content_id === localeCounterpartContentId) {
            break;
          } else if (j === localeContents.length - 1) {
            contents.push(englishContent);
          }
        }
      }

      return contents;
    },
  },
};
</script>