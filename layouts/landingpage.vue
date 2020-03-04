<template>
  <div class="is-boxed has-animations body-wrap boxed-container">
    <header class="site-header">
      <div class="container">
        <div class="site-header-inner">
          <div class="brand header-brand">
            <h1 class="m-0">
              <a href="index.html">
                <img src="../static/images/Logo_Venovum_3v2_small.svg"
                     alt="Venvoum Logo" />
              </a>
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main>
      <nuxt />
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="site-footer-inner">
          <div class="brand footer-brand">
            <!--                        <a href="#">-->
            <!--                            <img src="dist/images/logo.svg" alt="Blue logo">-->
            <!--                        </a>-->
          </div>
          <ul class="footer-links list-reset">
            <li>
              <a href="mailto:sales@venovum.com">Contact</a>
            </li>
            <!--                        <li>-->
            <!--                            <a href="#">About us</a>-->
            <!--                        </li>-->
            <!--                        <li>-->
            <!--                            <a href="#">FAQ's</a>-->
            <!--                        </li>-->
            <li>
              <a href="mailto:support@venovum.com">Support</a>
            </li>
          </ul>
          <ul class="footer-social-links list-reset">
            <li>
              <a href="#">
                <span class="screen-reader-text">Facebook</span>
                <svg width="16"
                     height="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                        fill="#FFF" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="screen-reader-text">Twitter</span>
                <svg width="16"
                     height="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                        fill="#FFF" />
                </svg>
              </a>
            </li>
            <!--                        <li>-->
            <!--                            <a href="#">-->
            <!--                                <span class="screen-reader-text">Google</span>-->
            <!--                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">-->
            <!--                                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFF"/>-->
            <!--                                </svg>-->
            <!--                            </a>-->
            <!--                        </li>-->
          </ul>
          <div class="footer-copyright">
            &copy; 2019 Venovum, all rights reserved
          </div>
        </div>
      </div>
    </footer>
    <script src="dist/js/main.min.js" />
    <script type="text/javascript"
            src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
            data-dojo-config="usePlainJson: true, isDebug: false" />
    <script>
      function showMailingPopup() {
      window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"50183a79e6ab481f049b91a46","lid":"69020ad2c8","uniqueMethods":true}) })
      document.cookie = "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
      document.getElementById("open-popup").onclick = function() {showMailingPopup()};
    </script>
    <script>
      !function () {
      const e = document.documentElement;
      if (e.classList.remove('no-js'), e.classList.add('js'), document.body.classList.contains('has-animations')) {
      const e = window.sr = ScrollReveal();
      e.reveal('.hero-title, .hero-paragraph, .hero-cta', {
      delay: 150,
      duration: 1e3,
      distance: '60px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'bottom',
      interval: 150,
      }), e.reveal('.hero-right-decoration', {
      duration: 1e3,
      distance: '40px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'top',
      }), e.reveal('.hero-left-decoration', {
      duration: 1e3,
      distance: '40px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'bottom',
      }), e.reveal('.clients li', {
      delay: 300,
      duration: 1e3,
      rotate: { y: 50 },
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      interval: 150,
      }), e.reveal('.feature, .tabs-links li, .testimonial, .pricing-table, .pricing-faqs, .cta-inner', {
      duration: 600,
      distance: '40px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      interval: 100,
      origin: 'bottom',
      viewFactor: .2,
      });
      }
      const t = document.getElementsByClassName('accordion-title');
      if (t.length) {
      for (let e = 0; e < t.length; e++) {
      t[e].addEventListener('click', function () {
      this.parentNode.classList.toggle('is-open');
      const e = this.nextElementSibling;
      e.style.maxHeight ? e.style.maxHeight = null : e.style.maxHeight = `${e.scrollHeight}px`;
      });
      }
      }
      const i = document.getElementsByClassName('tab-link');
      if (i.length) {
      for (let e = 0; e < i.length; e++) {
      i[e].addEventListener('click', function (t) {
      t.preventDefault();
      let n = i[e].parentNode.parentNode, a = n.nextElementSibling.getElementsByClassName('tab-panel'),
      s = n.getElementsByClassName('tab-link');
      for (let e = 0; e < s.length; e++) s[e].classList.remove('is-active');
      for (let e = 0; e < a.length; e++) a[e].classList.remove('is-active');
      let l = this.getAttribute('href');
      i[e].classList.add("is-active"), document.querySelector(l).classList.add("is-active")
      })
      }
      }
      }();
    </script>
    <script src="/js/main.min.js" />
  </div>
</template>

<script>
export default {
  name: 'Landingpage',
};
</script>
