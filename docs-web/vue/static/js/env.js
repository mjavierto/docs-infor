window.env = {
  // For an AWS environment
  API_URL: "https://HOSTVAR/api/v2/",
  ApiKey: "KEYVAR",
  ApiSecret: "SECRETVAR",

  // For a local environment
  // API_URL: "https://dev.docs.awsdev.infor.com/api/v2/",
  // ApiKey: "kmsciphertext:AQICAHhN616yk0PfNINY+e9GYB9T496pOZXscoI/UUPCvbB4KwHpkeU+2oWRJBB/VlZet9YIAAAAaDBmBgkqhkiG9w0BBwagWTBXAgEAMFIGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM//kw8v1ALccHjLJBAgEQgCVNjBnv965FBadCH6hSd+sRVCUNjnZkdFaPio5j9/ucrVHoFDQA",
  // ApiSecret: "kmsciphertext:AQICAHhN616yk0PfNINY+e9GYB9T496pOZXscoI/UUPCvbB4KwFobj/9qGlg9olsexSshDCDAAAAeDB2BgkqhkiG9w0BBwagaTBnAgEAMGIGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMeCtA7w5hLkZfO+jFAgEQgDVnqFIIWvaC3FZ4fNIvE+hW1VhwuCe1i/fqcTpN/zYuFX8uyXDI0GX6BNsafG5kIKrJYFmYlw==",

  getLocaleFromUrl: function (url) {
    var locale = url.replace(/.*\/([a-z]{2}\-[a-z]{2}).*/, "$1");
    if (locale.match(/^[a-z]{2}\-[a-z]{2}$/)) {
      return locale;
    } else {
      return "en-us";
    }
  },

  compareProducts(a, b) {
    const productNameA = window.env.removeInforPrefix(a['product_longname']);
    const productNameB = window.env.removeInforPrefix(b['product_longname']);

    let comparison = 0;
    if (productNameA > productNameB) {
      comparison = 1;
    } else if (productNameA < productNameB) {
      comparison = -1;
    }
    return comparison;
  },

  setProductLis: function (products) {
    var productList = "";
    const productsOrdered = products.sort(window.env.compareProducts);

    for (let i in productsOrdered) {
      let product = products[i];
      let productCode = product['product_code'];
      let productShortname = product['product_shortname'];
      let productLongname = window.env.removeInforPrefix(product['product_longname']);
      productLongname = window.env.htmlEncode(productLongname);

      let locale = window.env.getLocaleFromUrl(window.location.href);
      let productLi = '<li><a href="/' + locale + '/' + productShortname + '" class="productItem" id="' + productCode + '">' + productLongname + '</a></li>';
      productList = productList + productLi;
    }

    return productList;
  },

  removeInforPrefix: function (productLongname) {
    var exeptedProductLongnames = ["Infor BI", "Infor Nexus", "Infor Local.ly", "Infor Ming.le"];
    if (exeptedProductLongnames.indexOf(productLongname) === -1) {
      let indexOfInfor = productLongname.indexOf("Infor");
      if (indexOfInfor == 0) {
        productLongname = productLongname.slice(6, productLongname.length);
      }
    }

    return productLongname;
  },

  htmlEncode: function (text) {
    // https://stackoverflow.com/a/1219983/5488275
    return $("<div/>").text(text).html();
  },

  getFromApi: async function (path) {
    var token = sessionStorage.getItem("token");
    var expiration = sessionStorage.getItem("expiration");
    var now = new Date().getTime();
    var isValidToken = (token !== null) && (expiration > now);

    var url = window.env.API_URL + path;
    var data = null;
    if (isValidToken) {
      data = await window.env.callApi(url, token);
    } else {
      token = await window.env.getNewToken();
      if (token) {
        sessionStorage.setItem("token", token);
        data = await window.env.callApi(url, token)
      }
    }

    return await Promise.resolve(data);
  },

  getNewToken: async function () {
    var url = window.env.API_URL + "get_token";
    var data = {
      key: window.env.ApiKey,
      secret: window.env.ApiSecret
    };
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    try {
      let response = await fetch(url, options);
      let responseJson = await response.json();
      let token = responseJson.access_token;
      return await Promise.resolve(token);
    } catch (err) {
      return await Promise.resolve(null);
    }
  },

  callApi: async function (url, token) {
    var options = {
      headers: {
        "authorization": "Bearer " + token
      },
    };

    try {
      let response = await fetch(url, options);
      let responseJson = await response.json();
      let isValid = responseJson && (responseJson !== {}) && (responseJson !== []);
      if (isValid) {
        return await Promise.resolve(responseJson);
      } else {
        return await Promise.resolve(null);
      }
    } catch (err) {
      return await Promise.resolve(null);
    }
  }
};
