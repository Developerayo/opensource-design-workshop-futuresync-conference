var kKeyframeRule = window.CSSRule.WEBKIT_KEYFRAMES_RULE;
var AnimationManager = Class.create({
  initialize: function () {
    var a = document.createElement("style");
    a.type = "text/css";
    a.media = "screen";
    document.getElementsByTagName("head")[0].appendChild(a);
    this.styleSheet = document.styleSheets[document.styleSheets.length - 1];
    this.createdAnimations = new Object();
  },
  markAnimationsCreated: function (a) {
    this.createdAnimations[a] = true;
  },
  animationsCreated: function (a) {
    return this.createdAnimations[a];
  },
});
