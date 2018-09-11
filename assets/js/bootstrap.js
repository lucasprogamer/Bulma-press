

window._ = require('lodash');

const $ = global.jQuery;
window.$ = $;


//scroll menu
$(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll > 300) {
      $(".navbar").addClass('scrolled');
    }

    else{
      $(".navbar").removeClass('scrolled');
    }
  })
});

//burger menu
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);


  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        var $main = document.getElementById('main-menu');

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        $main.classList.toggle('is-active');

      });
    });
  }

});


$(document).ready(function(){
  var currentHash = window.location.hash;
  if (currentHash !== "") {
    $('html, body').animate({
        scrollTop: $(currentHash).offset().top  - 50
      }, 1200, function(){
        window.location.hash = currentHash;
      });
  }
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top  - 50
      }, 1200, function(){
        window.location.hash = hash;
          $('#menu_itens').removeClass('is-active');
          $('.navbar-burger').removeClass('is-active');

      });
    }
  });
});
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".navbar").addClass("is-fixed-top");
    } else {
        $(".navbar").removeClass("is-fixed-top");
    }
});

