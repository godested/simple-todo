define(function () {
  var id = 0;

  var TodoItemModel = function (options) {
    this.title = options.title || '';
    this.description = options.description || '';
    this.id = id++;
    this.state = this.constants.state.NEW;
  };

  TodoItemModel.prototype.constants = {
    state: {
      NEW: 'new',
      IN_PROGRESS: 'in-progress',
      COMPLETED: 'completed',
      ARCHIVED: 'archived'
    }
  };

  return TodoItemModel;
});