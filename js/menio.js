;(function() {
  'use strict';

  var menio = function menio(options) {
    this.element = document.querySelector(options.element);
    this.breakpoint = options.breakpoint;
    this.init();
  }

  window['menio'] = menio;

  menio.prototype.init = function() {
    this.switchView();

    window.addEventListener('resize', this.switchView.bind(this));
  };

  menio.prototype.switchView = function() {
    if (window.innerWidth() < this.breakpoint) {
      this.element.classList.add('mobile');
    }
    else {
      this.element.classList.removeClass('mobile');
    }
  };
});
