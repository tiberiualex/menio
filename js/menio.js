;(function() {
  'use strict';

  var Menio = function Menio(options) {
    this.element = document.querySelector(options.element);
    this.menu = this.element.querySelector('.menu');
    this.breakpoint = options.breakpoint;
    this.autoBreakpoint = false;
    this.init();
  };

  window.Menio = Menio;

  Menio.prototype.CssClasses_ = {
    IS_HORIZONTAL: 'menu--horizontal',
    IS_VERTICAL: 'menu--vertical',
    HAS_SUBMENU: 'menu__item--submenu-container',
    MENU_TOGGLE: 'menu-toggle',
    MENU_TOGGLE_VISIBLE: 'menu-toggle--visible',
    SUBMENU_TOGGLE: 'submenu-toggle',
    MENU_VISIBLE: 'menu--visible',
    SUBMENU_VISIBLE: 'submenu--visible'
  };

  Menio.prototype.init = function() {
    this.setupMarkup();
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

  Menio.prototype.setupMarkup = function() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.innerHTML = 'Menu';
    this.toggleButton.classList.add(this.CssClasses_.MENU_TOGGLE);
    this.element.insertBefore(this.toggleButton, this.menu);

    for (var i = 0; i < this.menu.querySelectorAll('ul').length; i++) {
      var submenu = this.menu.querySelectorAll('ul')[i];
      var toggleSubmenu = document.createElement('button');

      toggleSubmenu.classList.add(this.CssClasses_.SUBMENU_TOGGLE);
      submenu.parentElement.classList.add(this.CssClasses_.HAS_SUBMENU);
      submenu.parentElement.insertBefore(toggleSubmenu, submenu);
    }
  };

  Menio.prototype.switchView = function() {
    if (this.breakpoint !== 'auto') {
      var width = this.autoBreakpoint ? this.element.offsetWidth : window.innerWidth;

      if (width < this.breakpoint) {
        this.menu.classList.add(this.CssClasses_.IS_VERTICAL);
        this.menu.classList.remove(this.CssClasses_.IS_HORIZONTAL);
        this.toggleButton.classList.add(this.CssClasses_.MENU_TOGGLE_VISIBLE);
      } else {
        this.menu.classList.add(this.CssClasses_.IS_HORIZONTAL);
        this.menu.classList.remove(this.CssClasses_.IS_VERTICAL, this.CssClasses_.MENU_VISIBLE);
        this.toggleButton.classList.remove(this.CssClasses_.MENU_TOGGLE_VISIBLE);
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
    this.menu.classList.toggle(this.CssClasses_.MENU_VISIBLE);
  };
})();
