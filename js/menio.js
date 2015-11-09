;(function() {
  'use strict';

  var Menio = function Menio(options) {
    this.element = document.querySelector(options.element);
    this.menu = this.element.querySelector('ul');
    this.breakpoint = options.breakpoint;
    this.autoBreakpoint = false;
    this.init();
  };

  window.Menio = Menio;

  Menio.prototype.init = function() {
    this.createElements();
    this.addBindings();
    this.switchView();
  };

  Menio.prototype.addBindings = function() {
    window.addEventListener('resize', (function() {
      var _this = this;
      var wait = false;
      return function() {
        if (!wait) {
          _this.switchView();
          wait = true;
          setTimeout(function() {
            wait = false;
          }, 150);
        }
      };
    }).call(this));

    this.toggleButton.addEventListener('click', (function() {
      this.element.classList.toggle('menu-visible');
    }).bind(this));
  };

  Menio.prototype.createElements = function() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.innerHTML = 'Menu';
    this.toggleButton.classList.add('toggle-button');
    this.element.insertBefore(this.toggleButton, this.menu);
  };

  Menio.prototype.switchView = function() {
    if (this.breakpoint !== 'auto') {
      var width = this.autoBreakpoint ? this.element.offsetWidth : window.innerWidth;

      if (width < this.breakpoint) {
        this.element.classList.add('mobile');
      }
      else {
        this.element.classList.remove('mobile');
      }
    }
    else {
      this.autoBreakpoint = true;
      this.breakpoint = 0;

      for (var i = 0; i < this.menu.children.length; i++) {
        this.breakpoint += this.menu.children[i].offsetWidth;
      }

      this.switchView();
    }
  };
})();
