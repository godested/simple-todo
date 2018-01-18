define(['app/models/TodoItem'], function (TodoItemModel) {
  var TodoCollectionModel = function () {
    this.items = [];
  };

  TodoCollectionModel.prototype.addItem = function (item) {
    var task = item || {};
    this.items.push(new TodoCollectionModel(task));

    return this;
  };

  return TodoCollectionModel;
});