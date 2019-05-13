const BackgroundView = function(){
  this.speed = 0.5;
};

BackgroundView.prototype.bindEvents = function (){
  (function(){

    var parallax = document.querySelectorAll("html"),
        speed = 0.5;

    window.onscroll = function(){
      [].slice.call(parallax).forEach(function(el,i){

        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

        el.style.backgroundPosition = elBackgrounPos;

      });
    };

  })();
};

module.exports = BackgroundView;
