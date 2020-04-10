var kTouchStartEventName = "touchstart";
var kTouchMoveEventName = "touchmove";
var kTouchEndEventName = "touchend";
var kTouchCancelEventName = "touchcancel";
var kGestureStartEventName = "gesturestart";
var kGestureEndEventName = "gestureend";
var kSwipeEvent = "TouchController:SwipeEvent";
var kTapEvent = "TouchController:TapeEvent";
var TouchController = Class.create({
  initialize: function () {
    document.observe(
      kTouchStartEventName,
      this.handleTouchStartEvent.bind(this)
    );
    document.observe(kTouchMoveEventName, this.handleTouchMoveEvent.bind(this));
    document.observe(kTouchEndEventName, this.handleTouchEndEvent.bind(this));
    document.observe(
      kTouchCancelEventName,
      this.handleTouchCancelEvent.bind(this)
    );
    document.observe(
      kGestureStartEventName,
      this.handleGestureStartEvent.bind(this)
    );
    document.observe(
      kGestureEndEventName,
      this.handleGestureEndEvent.bind(this)
    );
    this.swipeInProgress = false;
    this.swipeFingerCount = 0;
    this.swipeStartTime = 0;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.preventDefault = true;
    this.tapEventCallback = null;
    this.setTrackArea(0, 0, 0, 0);
    this.enableTouchTracking = true;
  },
  setTouchTrackingEnabled: function (a) {
    this.enableTouchTracking = a;
  },
  setTrackArea: function (d, c, b, a) {
    debugMessage(
      kDebugTouchController_SetTrackArea,
      "left: " + d + " top: " + c + " width: " + b + " height: " + a
    );
    this.trackAreaLeft = d;
    this.trackAreaTop = c;
    this.trackAreaRight = d + b;
    this.trackAreaBottom = c + a;
  },
  registerTapEventCallback: function (a) {
    this.tapEventCallback = a;
  },
  isTouchWithinTrackArea: function (a) {
    debugMessage(kDebugTouchController_IsTouchWithinTrackArea, "checking...");
    if (this.enableTouchTracking === false) {
      debugMessage(
        kDebugTouchController_IsTouchWithinTrackArea,
        "- nope, tracking is disabled"
      );
      return false;
    }
    if (a.clientX < this.trackAreaLeft) {
      debugMessage(
        kDebugTouchController_IsTouchWithinTrackArea,
        "- nope, x < left"
      );
      return false;
    }
    if (a.clientX > this.trackAreaRight) {
      debugMessage(
        kDebugTouchController_IsTouchWithinTrackArea,
        "- nope, x > right"
      );
      return false;
    }
    if (a.clientY < this.trackAreaTop) {
      debugMessage(
        kDebugTouchController_IsTouchWithinTrackArea,
        "- nope, y < top"
      );
      return false;
    }
    if (a.clientY > this.trackAreaBottom) {
      debugMessage(
        kDebugTouchController_IsTouchWithinTrackArea,
        "- nope, y > bottom"
      );
      return false;
    }
    debugMessage(kDebugTouchController_IsTouchWithinTrackArea, "- yes it is!");
    return true;
  },
  handleTouchStartEvent: function (b) {
    debugMessage(
      kDebugTouchController_HandleTouchStartEvent,
      "touch event has " + b.touches.length + " fingers..."
    );
    if (this.swipeInProgress === false) {
      debugMessage(
        kDebugTouchController_HandleTouchStartEvent,
        "- this is the first finger down event..."
      );
      var a = b.touches[0];
      if (this.isTouchWithinTrackArea(a)) {
        debugMessage(
          kDebugTouchController_HandleTouchStartEvent,
          "- start tracking a swipt event..."
        );
        if (this.preventDefault) {
          b.preventDefault();
        }
        this.swipeInProgress = true;
        this.swipeFingerCount = b.touches.length;
        this.swipeStartTime = new Date();
        this.swipeStartX = a.clientX;
        this.swipeStartY = a.clientY;
      } else {
        debugMessage(
          kDebugTouchController_HandleTouchStartEvent,
          "- but it is outside of the track area"
        );
      }
    } else {
      debugMessage(
        kDebugTouchController_HandleTouchStartEvent,
        "- this is a subsequent finger down event. update finger count..."
      );
      if (b.touches.length > this.swipeFingerCount) {
        this.swipeFingerCount = b.touches.length;
        debugMessage(
          kDebugTouchController_HandleTouchStartEvent,
          "- this.swipeFingerCount:" + this.swipeFingerCount
        );
      }
    }
  },
  handleTouchCancelEvent: function (a) {
    debugMessage(kDebugTouchController_HandleTouchCancelEvent, "");
    this.swipeInProgress = false;
  },
  handleGestureStartEvent: function (a) {
    debugMessage(kDebugTouchController_HandleGestureStartEvent, "");
    if (this.preventDefault) {
      a.preventDefault();
    }
  },
  handleGestureEndEvent: function (a) {
    debugMessage(kDebugTouchController_HandleGestureEndEvent, "");
    if (this.preventDefault) {
      a.preventDefault();
    }
  },
});
