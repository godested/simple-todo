define([
  'app/models/TodoItem',
  'lib/text!templates/todoItem/todoItem.html',
  'lib/mustache.min'
], function (TodoItem, todoItemTemplate, mustache) {
  var readLocalStorage = function () {
    return JSON.parse(localStorage.getItem('todoItems'));
  };

  var todoItems = readLocalStorage() || [];

  var writeLocalStorage = function () {
    localStorage.setItem('todoItems', JSON.stringify(todoItems) || []);
  };


  var form = document.querySelector('.new-todo');
  var table = document.querySelector('.todo');
  var title = document.querySelector('.new-todo__title');
  var description = document.querySelector('.new-todo__description');
  var itemsContainer = document.querySelector('.todo__container');

  var render = function () {
    itemsContainer.innerHTML = todoItems.map(function (item) {
      return mustache.render(todoItemTemplate, item);
    }).join('');
  };

  var update = function () {
    writeLocalStorage();
    todoItems = readLocalStorage();
    render();
  };

  var handleSubmit = function (ev) {
    ev.preventDefault();

    todoItems.push(new TodoItem({
      title: title.value,
      description: description.value,
      id: todoItems.length
    }));

    title.value = '';
    description.value = '';
    update();
  };

  var editTodo = function (id) {
    var itemForEdit = document.querySelector('.task-' + id);

    var title =  itemForEdit.querySelector('.task__title');
    var description =  itemForEdit.querySelector('.task__description');
    var state =  itemForEdit.querySelector('.task__state');
    var action =  itemForEdit.querySelector('.task__action');

    var getState = function (state) {
      if (todoItems[id].state === state) {
        return 'selected'
      }
    };

    title.innerHTML = '<input type="text" class="form-control edit-title-' + id + '" value="' + todoItems[id].title + '">';
    state.innerHTML = ['<select class="custom-select edit-state-' + id + '"">',
      '<option value="new" ',
      getState('New'),
      '>New</option>',
      '<option value="in-progress" ',
      getState('In progress'),
      '>In progress</option>',
      '<option value="completed" ',
      getState('Completed'),
      '>Completed</option>',
      '<option value="archived" ',
      getState('Archived'),
      '>Archived</option>',
      '</select>'].join('');
    description.innerHTML = '<input type="text" class="form-control edit-description-' + id + '"" value="' + todoItems[id].description + '">';
    action.innerHTML = '<button type="button" class="btn btn-success edit-button-' + id + '">Done</button>';

    var button = itemForEdit.querySelector('.edit-button-' + id);

    var parseData = function (ev) {
      todoItems[id] = new TodoItem({
        title: itemForEdit.querySelector('.edit-title-' + id).value,
        description: itemForEdit.querySelector('.edit-description-' + id).value,
        id: id
      });

      todoItems[id].setNewState(itemForEdit.querySelector('.edit-state-' + id).value);

      button.removeEventListener('click', parseData);

      update();
    };

    button.addEventListener('click', parseData);
  };
  
  var handleClickOnTable = function (ev) {
    if (ev.target.className.indexOf('action__delete') !== -1) {
      var id = ev.target.dataset.id;

      todoItems = todoItems.filter(function (item) {
        return item.id != id;
      });

      update();
    }

    if (ev.target.className.indexOf('action__edit') !== -1) {
      editTodo(ev.target.dataset.id)
    }
  };


  form.addEventListener('submit', handleSubmit);
  table.addEventListener('click', handleClickOnTable);

  render();
});