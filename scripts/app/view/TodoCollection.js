define([
  'app/models/TodoCollectionModel',
  'app/mode/TodoItem'
], function (TodoCollectionModel, TodoItemModel) {
  var TodoCollectionView = function () {
    this.model = new TodoCollectionModel();

    this.render = this.render.bind(this);
  };

  TodoCollectionView.prototype.fetchData = function () {
    var data = JSON.parse(localStorage.getItem('todoItems')) || [];
    this.model.items = data.map(function (item) {
      return new TodoItemModel(item);
    });

    return this;
  };

  TodoCollectionView.prototype.saveData = function () {
    localStorage.setItem('todoItems', JSON.stringify(this.model.items) || []);

    return this;
  };

  TodoCollectionView.prototype.render = function () {
    this.fetchData();

  };


  return TodoCollectionView;
});