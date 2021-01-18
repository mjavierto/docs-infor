# vue

This directory contains the Vue.js project for the docs.infor.com front end.

## Prerequisites for Vue.js
[Node.js](https://nodejs.org/en/download/) for npm (node package manager).

Note: Before I started with Vue, I changed the npm prefix from Windows roaming user location to a WebProjects folder on C: using the changing the location of global packaged instructions at https://www.sitepoint.com/beginners-guide-node-package-manager/

Installation
See the https://vuejs.org/v2/guide/installation.html

## Recommended
Create a local projects directory, e.g. WebProjects and install vue-cli globally.

``` bash
$ npm install --global vue-cli
```
THEN add the docs-web repo from Oxford to this directory.

## Dependencies
vue-i18n

``` bash
npm install --save vue-i18n
```

## Build Setup
From the docs-web\vue directory,
install dependencies

``` bash
npm install

# serve with hot reload at localhost:8000
# to change from 8000, go to project/build/dev-server.js var port =
npm run dev
# to stop dev server, Ctrl C

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Pre-Bitbucket css version history:

INFOR.CSS:

* 4.0.3_07142017
-- adjusted attributes for Version label styling
* 4.0.2_07052017
-- added "Documentation Central" link in media queries
-- corrected "News" icon in mobile display
* 4.0_052017
-- Disabled the classes not being used in the html files
 .btn.video-btn, .launch-video-btn, .button-container, .cta-link, .l-content-sidebar, .c-2-col.narrow,b .c-75-25, .no-pad-top, .no-pad-bot,       .page-header, .cmsable, .callout-band, .site-footer, .back-to-top, .site-footer .primary .connect a, .site-footer .sitemap, .modal, .video-       modal, .chat-modal, .slide-carousel, .slick-slider, .slick-list, .slick-track, .slick-prev, .slick-disabled, .slick-dots, .hero-slider,           .insight-tabs, .resource-card, .resource-link, .links-blocks, .slider (any *-slider), .company-logos-band, .statement-blocks, .full, width-bg-   callout, .locations-map, .social-feed (*any social media feed), .news-entry, .contact-module, .share-this-icons, .upsell, .resources-band,       .resource-blocks,  .vertical-resources-slider, .external-link-blocks, .brief-overview-panel, .content-strip-container, .standout-panel,           .screens-preview-container, .profile-block, .exploration-container, .product-resource, .features-blocks, .featured-content-container,             .industry-link-blocks, .blog, .page-404, .content-info-blocks, .compartment-blocks (any *-compartment-blocks), .customer-story-card, .data-        table, .links-block, .text-link, .customer-card, .legacy-browser-notification
* 4.0_062017
-- removed social media related style definitions
* 4.0_06142017
-- reverted chat attribs
* 4.0.1_06162017
-- clean up

MEDIA.CSS:

* 1.0_06152017
-- drafted a file to contain social-cards or media-cards styling

IMAGES

Mainly used in infor.css, app.css and media.css