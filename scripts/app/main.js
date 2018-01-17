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
  var filter = document.querySelector('.filter');
  var title = document.querySelector('.new-todo__title');
  var description = document.querySelector('.new-todo__description');
  var itemsContainer = document.querySelector('.todo__container');
  var selectAll = document.querySelector('.select-all');
  var selectAction = document.querySelector('.selected-action__button');

  var render = function (items) {
    var todoList = items || todoItems;
    itemsContainer.innerHTML = todoList.map(function (item) {
      return mustache.render(todoItemTemplate, item);
    }).join('');
  };

  var update = function (items) {
    writeLocalStorage();
    todoItems = readLocalStorage();
    render(items);
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

    var title = itemForEdit.querySelector('.task__title');
    var description = itemForEdit.querySelector('.task__description');
    var state = itemForEdit.querySelector('.task__state');
    var action = itemForEdit.querySelector('.task__action');

    var getState = function (state) {
      if (todoItems[id].state === state) {
        return 'selected'
      }
    };

    title.innerHTML = '<input type="text" class="form-control edit-title-' + id + '" value="' + todoItems[id].title + '">';
    description.innerHTML = '<input type="text" class="form-control edit-description-' + id + '"" value="' + todoItems[id].description + '">';
    state.innerHTML = ['<select class="custom-select edit-state-' + id + '"">',
      '<option value="new" ',
      getState('new'),
      '>New</option>',
      '<option value="in-progress" ',
      getState('in-progress'),
      '>In progress</option>',
      '<option value="completed" ',
      getState('completed'),
      '>Completed</option>',
      '<option value="archived" ',
      getState('archived'),
      '>Archived</option>',
      '</select>'].join('');
    action.innerHTML = '<button type="button" class="btn btn-success edit-button-' + id + '">Done</button>';

    var button = itemForEdit.querySelector('.edit-button-' + id);

    var parseData = function (ev) {
      todoItems[id] = new TodoItem({
        title: itemForEdit.querySelector('.edit-title-' + id).value,
        description: itemForEdit.querySelector('.edit-description-' + id).value,
        id: id
      });

      todoItems[id].setNewState(itemForEdit.querySelector('.edit-state-' + id).value);

      console.log('---->', todoItems[id]);
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
      editTodo(ev.target.dataset.id);
    }
  };

  var handleFilterChange = function (ev) {
    var state = ev.target.value;

    if (state === 'all') {
      update();
      return;
    }

    update(todoItems.filter(function (item) {
      return item.state === state;
    }));
  };

  var handleSelectAll = function (ev) {
    var items = document.querySelectorAll('.select-item');
    if (selectAll.checked) {
      for (var i = 0; i < items.length; i++) {
        items[i].checked = true;
      }
    } else {
      for (var i = 0; i < items.length; i++) {
        items[i].checked = false;
      }
    }
  };

  var handleSelectAction = function (ev) {
    ev.preventDefault();
    var state = document.querySelector('.selected-action__state').value;

    if (state === 'not-chosen') {
      return;
    }

    var checkboxes = document.querySelectorAll('.select-item');

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        if (state === 'delete') {
          todoItems = todoItems.filter(function (todo) {
            console.log('---->', todo, todoItems[checkboxes[i].dataset.id]);
            return todo.id !== todoItems[checkboxes[i].dataset.id].id;
          });
          continue;
        }

        todoItems[checkboxes[i].dataset.id] = new TodoItem(todoItems[checkboxes[i].dataset.id]);
        todoItems[checkboxes[i].dataset.id].setNewState(state);
      }
    }

    update();
  };


  form.addEventListener('submit', handleSubmit);
  table.addEventListener('click', handleClickOnTable);
  filter.addEventListener('change', handleFilterChange);
  selectAll.addEventListener('click', handleSelectAll);
  selectAction.addEventListener('click', handleSelectAction);

  render();
});