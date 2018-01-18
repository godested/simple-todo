define([
  'app/view/TodoItem',
  'app/view/TodoForm',
  'lib/text!templates/todoItem/todoItem.html',
  'lib/mustache.min',
  'app/utils/Mediator'
], function (TodoItemView,
             TodoFormView,
             todoItemTemplate,
             mustache,
             Mediator) {

  var TodoCollectionView = function () {
    this.items = [];
    this.mediator = new Mediator();
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
    console.log('---->', 'fetch');
    var data = JSON.parse(localStorage.getItem('todoItems')) || [];
    this.items = data.map(function (item) {
      return new TodoItemView(item.model);
    });

    return this;
  };

  TodoCollectionView.prototype.saveData = function () {
    console.log('---->', 'saving', this.items);
    localStorage.setItem('todoItems', JSON.stringify(this.items) || []);


    return this;
  };

  TodoCollectionView.prototype.setMediator = function () {
    this.formView.mediator = this.mediator;

    return this;
  };

  TodoCollectionView.prototype.addNewItem = function (ev, item) {
    this.items.push(new TodoItemView(item));

    this.updateList();
    this.saveData();
    return this;
  };

  TodoCollectionView.prototype.delegateEvent = function () {
    this.mediator.subscribe('newItem', this.addNewItem);

    this.formView.delegateEvent();

    return this;
  };

  TodoCollectionView.prototype.updateList = function () {
    var todoList = this.items || [];
    this.container.innerHTML = todoList.map(function (item) {
      console.log('---->', item.model);
      return mustache.render(todoItemTemplate, item.model);
    }).join('');


    return this;
  };

  TodoCollectionView.prototype.render = function () {
    this.fetchData();
    this.setMediator();
    this.delegateEvent();
    this.updateList();

    return this;
  };


  return TodoCollectionView;
});