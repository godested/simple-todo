define(['app/models/TodoItem',
  'lib/text!templates/editItem/title.html',
  'lib/text!templates/editItem/description.html',
  'lib/text!templates/editItem/state.html',
  'lib/text!templates/editItem/action.html',
  'lib/mustache.min'], function (TodoItemModel,
                                 titleTemplate,
                                 descriptionTemplate,
                                 stateTemplate,
                                 actionTemplate,
                                 mustache) {
  var TodoItemView = function (options) {
    this.model = new TodoItemModel(options.item || {});
    this.listContainer = options.listContainer;
    this.mediator = options.mediator || {};

    this.getDOMNodes = this.getDOMNodes.bind(this);
    this.parseData = this.parseData.bind(this);
    this.delegateEvent = this.delegateEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  TodoItemView.prototype.getDOMNodes = function () {
    this.listContainer = document.querySelector('.task-' + this.model.id);
    this.editButton = this.listContainer.querySelector('.action__edit');
    this.deleteButton = this.listContainer.querySelector('.action__delete');
    this.title = this.listContainer.querySelector('.task__title');
    this.description = this.listContainer.querySelector('.task__description');
    this.state = this.listContainer.querySelector('.task__state');
    this.action = this.listContainer.querySelector('.task__action');


    return this;
  };

  TodoItemView.prototype.parseData = function () {
    var titleValue = this.listContainer.querySelector('.edit-title').value;
    var descriptionValue = this.listContainer.querySelector('.edit-description').value;
    var stateValue = this.listContainer.querySelector('.edit-state').value;

    var data = {
      title: titleValue,
      description: descriptionValue,
      state: stateValue,
      id: this.model.id
    };

    this.mediator.notify('editItem', data);
  };

  TodoItemView.prototype.editItem = function (ev) {
    console.log('---->', this.model.id);

    this.title.innerHTML = mustache.render(titleTemplate, this.model);
    this.description.innerHTML = mustache.render(descriptionTemplate, this.model);
    this.state.innerHTML = mustache.render(stateTemplate, this.model);
    this.action.innerHTML = mustache.render(actionTemplate, this.model);

    var submitButton = this.listContainer.querySelector('.edit-button');

    submitButton.addEventListener('click', this.parseData);

    return this;
  };

  TodoItemView.prototype.handleClick = function (ev) {
    if (ev.target === this.editButton) {
      this.editItem(ev);
    }

    if (ev.target === this.deleteButton) {
      console.log('---->', 'delete');
    }

    return this;
  };

  TodoItemView.prototype.delegateEvent = function () {
    this.getDOMNodes();
    this.listContainer.addEventListener('click', this.handleClick);

    return this;
  };

  return TodoItemView;
});