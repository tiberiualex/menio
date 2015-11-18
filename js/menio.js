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

  Menio.prototype.CssClasses_ = {
    IS_MOBILE: 'mobile',
    TOGGLE_BUTTON: 'toggle-button',
    MENU_VISIBLE: 'menu-visible',
  };

  Menio.prototype.init = function() {
    this.createElements();
    this.addBindings();
    this.switchView();
  };

  Menio.prototype.boundMethod = function(name) {
    return this['_' + name + '_'] || Object.defineProperty(
      this, '_' + name + '_', {value: this[name].bind(this)}
    )['_' + name + '_'];
  };

  Menio.prototype.addBindings = function() {
    window.addEventListener('resize', this.boundMethod('switchView'));
    this.toggleButton.addEventListener('click', this.boundMethod('toggleMenu'));
  };

  Menio.prototype.createElements = function() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.innerHTML = 'Menu';
    this.toggleButton.classList.add(this.CssClasses_.TOGGLE_BUTTON);
    this.element.insertBefore(this.toggleButton, this.menu);
  };

  Menio.prototype.switchView = function() {
    if (this.breakpoint !== 'auto') {
      var width = this.autoBreakpoint ? this.element.offsetWidth : window.innerWidth;

      if (width < this.breakpoint) {
        this.element.classList.add(this.CssClasses_.IS_MOBILE);
      } else {
        this.element.classList.remove(this.CssClasses_.IS_MOBILE);
      }
    } else {
      this.autoBreakpoint = true;
      this.breakpoint = 0;

      for (var i = 0; i < this.menu.children.length; i++) {
        this.breakpoint += this.menu.children[i].offsetWidth;
      }

      this.switchView();
    }
  };

  Menio.prototype.toggleMenu = function() {
    this.element.classList.toggle(this.CssClasses_.MENU_VISIBLE);
  };
})();
