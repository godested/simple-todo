define(function () {
  var TodoItem = function (options) {
    options = options || {};

    this.title = options.title || '';
    this.description = options.description || '';
    this.id = options.id;
    this.state = this.contants.state.NEW;
    this.suffix = this.contants.suffix.NEW;

    this.setNewState = this.setNewState.bind(this);
  };

  TodoItem.prototype.contants = {
    state: {
      NEW: 'New',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      ARCHIVED: 'Archived'
    },
    suffix: {
      NEW: 'primary',
      IN_PROGRESS: 'info',
      COMPLETED: 'success',
      ARCHIVED: 'secondary'
    } };

  TodoItem.prototype.setNewState = function (state) {
    if (state === 'new') {
      this.state = this.contants.state.NEW;
      this.suffix = this.contants.suffix.NEW
    }
    if (state === 'in-progress') {
      this.state = this.contants.state.IN_PROGRESS;
      this.suffix = this.contants.suffix.IN_PROGRESS;
    }
    if (state === 'completed') {
      this.state = this.contants.state.COMPLETED;
      this.suffix = this.contants.suffix.COMPLETED;
    }
    if (state === 'archived') {
      this.state = this.contants.state.ARCHIVED;
      this.suffix = this.contants.suffix.ARCHIVED;
    }
  };

  return TodoItem;
});