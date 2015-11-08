;(function() {
  'use strict';

  var Menio = function Menio(options) {
    this.element = document.querySelector(options.element);
    this.breakpoint = options.breakpoint;
    this.init();
  }

  window['Menio'] = Menio;

  Menio.prototype.init = function() {
    this.switchView();

    window.addEventListener('resize', this.switchView.bind(this));
  };

  Menio.prototype.switchView = function() {
    if (window.innerWidth() < this.breakpoint) {
      this.element.classList.add('mobile');
    }
    else {
      this.element.classList.removeClass('mobile');
    }
  };
});
