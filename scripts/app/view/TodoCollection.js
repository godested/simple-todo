define([
  'app/models/TodoCollection',
  'app/models/TodoItem',
  'app/view/TodoForm',
  'lib/text!templates/todoItem/todoItem.html',
  'lib/mustache.min'
], function (TodoCollectionModel,
             TodoItemModel,
             TodoFormView, todoItemTemplate,
             mustache) {

  var TodoCollectionView = function () {
    this.model = new TodoCollectionModel();
    this.formView = new TodoFormView();
    this.container = document.querySelector('.todo__container');

    this.render = this.render.bind(this);
    this.setMediator = this.setMediator.bind(this);
    this.delegateEvent = this.delegateEvent.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
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

  TodoCollectionView.prototype.setMediator = function () {
    this.formView.mediator = this.model.mediator;

    return this;
  };

  TodoCollectionView.prototype.addNewItem = function (ev, data) {
    console.log('---->', data);
    this.model.items.push(new TodoItemModel(data));

    this.updateContent();
    return this;
  };

  TodoCollectionView.prototype.delegateEvent = function () {
    this.setMediator();
    this.model.mediator.subscribe('newItem', this.addNewItem);

    this.formView.delegateEvent();

    return this;
  };

  TodoCollectionView.prototype.updateContent = function () {
    this.saveData();
    this.fetchData();
    var todoList = this.model.items || [];
    this.container.innerHTML = todoList.map(function (item) {
      return mustache.render(todoItemTemplate, item);
    }).join('');
  };

  TodoCollectionView.prototype.render = function () {
    this.fetchData();
    this.updateContent();

    this.delegateEvent();

    return this;
  };


  return TodoCollectionView;
});