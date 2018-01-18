define(function () {
  var Mediator = function () {
    this.events = {};
  };

  Mediator.prototype.subscribe = function (eventName, callback) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this;
  };

  Mediator.prototype.notify = function (eventName, data) {
    var listeners = this.events[eventName];

    if (typeof listeners === 'undefined') {
      return this;
    }

    listeners.forEach(function (listener) {
      try {
        listener(eventName, data);
      } catch (ignoredEx) {
      }
    });

    return this;

  };

  Mediator.prototype.unsubscribe = function (eventName, callback) {
    var listeners = this.events[eventName];

    if (typeof listeners === 'undefined') {
      return this;
    }

    this.events[eventName] = listeners.filter(function (listener) {
      return listener !== callback;
    });

    return this;
  };

  return Mediator;
});