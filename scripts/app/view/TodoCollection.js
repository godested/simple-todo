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
    this.formView = new TodoFormView({mediator: this.mediator});
    this.listContainer = document.querySelector('.todo__container');

    this.render = this.render.bind(this);
    this.delegateEvent = this.delegateEvent.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.createItemNode = this.createItemNode.bind(this);
  };

  TodoCollectionView.prototype.fetchData = function () {
    console.log('---->', 'fetch');
    var data = JSON.parse(localStorage.getItem('todoItems')) || [];
    var mediatorInstance = this.mediator;
    this.items = data.map(function (item) {
      return new TodoItemView({
        item: item.model,
        mediator: mediatorInstance
      });
    });

    return this;
  };

  TodoCollectionView.prototype.saveData = function () {
    console.log('---->', 'saving', this.items);
    localStorage.setItem('todoItems', JSON.stringify(this.items) || []);

    return this;
  };

  TodoCollectionView.prototype.addNewItem = function (ev, item) {
    var todo = new TodoItemView({
      item: item,
      mediator: this.mediator
    });

    this.items.push(todo);

    var createItem = this.createItemNode;
    this.listContainer.appendChild(createItem(mustache.render(todoItemTemplate, todo.model), todo.model.id));

    this.saveData();

    return this;
  };

  TodoCollectionView.prototype.createItemNode = function (html, id) {
    var item = document.createElement('tr');
    item.className = 'todo__item task task-' + id + ' state-' + this.items[id].model.state;
    item.innerHTML = html;

    return item;
  };

  TodoCollectionView.prototype.updateItem = function (ev, item) {
    this.items[item.id] = new TodoItemView({
      item: item,
      mediator: this.mediator
    });


    this.listContainer.replaceChild(
      this.createItemNode(mustache.render(todoItemTemplate, this.items[item.id].model), item.id),
      this.listContainer.querySelector('.task-' + item.id)
    );

    this.saveData();

    return this;
  };

  TodoCollectionView.prototype.delegateEvent = function () {
    this.mediator.subscribe('newItem', this.addNewItem);
    this.mediator.subscribe('editItem', this.updateItem);
    this.formView.delegateEvent();

    this.items.forEach(function (item) {
      item.delegateEvent();
    });

    return this;
  };

  TodoCollectionView.prototype.renderList = function () {
    var todoList = this.items || [];
    var container = this.listContainer;
    var createItem = this.createItemNode;
    todoList.forEach(function (item) {
      console.log('---->', item.model);
      container.appendChild(createItem(mustache.render(todoItemTemplate, item.model), item.model.id));
    });

    return this;
  };

  TodoCollectionView.prototype.render = function () {
    this.fetchData();
    this.renderList();
    this.delegateEvent();

    return this;
  };

  return TodoCollectionView;
});