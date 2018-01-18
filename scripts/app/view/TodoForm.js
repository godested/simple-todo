define(function () {
  var TodoFormView = function () {
    this.form = document.querySelector('.new-todo');
    this.title = document.querySelector('.new-todo__title');
    this.description = document.querySelector('.new-todo__description');
    this.mediator = {};

    this.parseData = this.parseData.bind(this);
  };

  TodoFormView.prototype.parseData = function (ev) {
    ev.preventDefault();
    var item = {
      title: this.title.value,
      description: this.description.value
    };

    this.title.value = null;
    this.description.value = null;

    this.mediator.notify('newItem', item);
  };

  TodoFormView.prototype.delegateEvent = function () {
    this.form.addEventListener('submit', this.parseData);
  };

  return TodoFormView;
});