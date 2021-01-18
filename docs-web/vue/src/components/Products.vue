<template>
  <div class="products">
    <main class="site-content has-sections" role="main" id="main" tabindex="-1">
      <div class="searchpage">
        <section class="productline-alpha">
          <div class="wrapper">
            <h1>{{ $t("products.products_title") }}</h1>
            <ul class="breadCrumb">
              <li>
                <a href="/">{{ $t("products.products_home") }}</a>
              </li>
              <li>/</li>
              <li>{{ $t("products.products_header_products_az") }}</li>
            </ul>
            <div class="clearfix"></div>
            <h1 id="nav-links" class="nav-links">
              <a
                :href="'#'+letter.toLowerCase()"
                v-for="letter in alphabet"
                :key="letter"
              >{{ letter }}</a>
            </h1>
            <p>
              {{ $t("products.products_extreme_message_pre_link") }}
              <a
                href="https://support.infor.com/espublic/en/AnswerLinkDotNet/SoHo/DocLink/SoHoDocLink.aspx"
              >Infor Support Portal</a>
              {{ $t("products.products_extreme_message_post_link") }}
            </p>
          </div>
        </section>
        <section>
          <div class="wrapper">
            <ul id="list" class="search-item">
              <li v-for="letter in alphabet" v-if="letter in activeProductGroups" :key="letter">
                <h3>
                  <p v-bind:id="letter.toLowerCase()" class="section">{{ letter }}</p>
                </h3>
                <ul>
                  <li
                    class="section"
                    v-for="product in activeProductGroups[letter]"
                    v-bind:key="product.productLongname"
                  >
                    <a :href="product.productShortname">{{ product.productLongname }}</a>
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
      locale: this.$i18n.locale,
      activeProductGroups: {},
    };
  },

  created: async function () {
    var activeProducts = await window.env.getFromApi("web/activeProducts");
    if (activeProducts) {
      this.setActiveProductGroups(activeProducts);
    }
  },

  methods: {
    setActiveProductGroups: function (activeProducts) {
      var products = this.removeInforPrefix(activeProducts);
      var productGroups = this.groupByLetters(products);
      var sortedProductGroups = this.sortByProductLongnames(productGroups);
      this.activeProductGroups = sortedProductGroups;
    },

    removeInforPrefix: function (products) {
      for (const product of products) {
        let productLongname = product.productLongname;
        productLongname = window.env.removeInforPrefix(productLongname);
        product.productLongname = productLongname;
      }

      return products;
    },

    groupByLetters: function (products) {
      // An array of products grouped by the first uppercased letters (A-Z) of their productLongnames
      var productGroups = {};

      for (const product of products) {
        let productLongname = product.productLongname;
        let upperCasedLetter = productLongname.substring(0, 1).toUpperCase();
        if (!(upperCasedLetter in productGroups)) {
          productGroups[upperCasedLetter] = [];
        }
        productGroups[upperCasedLetter].push(product);
      }

      return productGroups;
    },

    sortByProductLongnames: function (productGroups) {
      // Sort productGroups within each letter group by productLongname
      for (const letter in productGroups) {
        productGroups[letter] = productGroups[letter].sort(this.compare);
      }

      return productGroups;
    },

    compare: function (a, b) {
      // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
      if (a.productLongname < b.productLongname) {
        return -1;
      } else if (a.productLongname > b.productLongname) {
        return 1;
      } else {
        return 0;
      }
    },
  },
};
</script>
