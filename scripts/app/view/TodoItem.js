define(['app/models/TodoItem'],function (TodoItemModel) {
  var TodoItemView = function (item) {
    this.model = new TodoItemModel(item || {});
  };

  return TodoItemView;
});