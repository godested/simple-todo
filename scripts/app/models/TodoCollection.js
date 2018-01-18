define([
  'app/models/TodoItem',
  'app/utils/Mediator'
], function (TodoItemModel, Mediator) {
  var TodoCollectionModel = function () {
    this.items = [];
    this.mediator = new Mediator();
  };

  TodoCollectionModel.prototype.addItem = function (item) {
    var task = item || {};
    this.items.push(new TodoCollectionModel(task));

    return this;
  };

  return TodoCollectionModel;
});