<template>
  <div class="bottomfooter">
    <div id="container" aria-hidden="true">
      <footer class="site-footer" role="contentinfo" th:fragment="footer">
        <div class="wrapper">
          <div class="secondary">
            <ul>
              <li>
                <a
                  class="not_protected"
                  href="http://www.infor.com/services/education"
                >{{ $t("footer.footer_training") }}</a>
              </li>
              <li>
                <a
                  class="not_protected"
                  href="http://www.infor.com/support/"
                >{{ $t("footer.footer_support") }}</a>
              </li>
              <li>
                <a
                  class="not_protected"
                  href="http://www.infor.com/services/"
                >{{ $t("footer.footer_services") }}</a>
              </li>
              <li>
                <a
                  class="not_protected"
                  href="http://www.infor.com/contact/"
                >{{ $t("footer.footer_contact") }}</a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://www.infor.com/about/legal"
                  class="not_protected"
                >{{ $t("footer.footer_legal") }}</a>
              </li>
              <li>
                <a
                  href="http://www.infor.com/company/privacy/"
                  class="not_protected"
                >{{ $t("footer.footer_privacy") }}</a>
              </li>
            </ul>
            <p class="copyright">&copy; {{ $t("footer.footer_copyright") }}</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>