define(function () {
  var TodoItem = function (options) {
    options = options || {};

    this.title = options.title || '';
    this.description = options.description || '';
    this.id = options.id;
    this.state = this.constants.state.NEW.data;
    this.htmlState = this.constants.state.NEW.html;
    this.suffix = this.constants.state.NEW.suffix;

    this.setNewState = this.setNewState.bind(this);
  };

  TodoItem.prototype.constants = {
    state: {
      NEW: {
        data: 'new',
        suffix: 'primary',
        html: 'New'
      },
      IN_PROGRESS: {
        data: 'in-progress',
        suffix: 'info',
        html: 'In progress'
      },
      COMPLETED: {
        data: 'completed',
        suffix: 'success',
        html: 'Completed'
      },
      ARCHIVED: {
        data: 'archived',
        suffix: 'secondary',
        html: 'Archived'
      }
    }
  };

  TodoItem.prototype.setNewState = function (state) {
    this.state = state;
    if (state === this.constants.state.NEW.data) {
      this.suffix = this.constants.state.NEW.suffix;
      this.htmlState = this.constants.state.NEW.html;
    }
    if (state === this.constants.state.IN_PROGRESS.data) {
      this.suffix = this.constants.state.IN_PROGRESS.suffix;
      this.htmlState = this.constants.state.IN_PROGRESS.html;
    }
    if (state === this.constants.state.COMPLETED.data) {
      this.suffix = this.constants.state.COMPLETED.suffix;
      this.htmlState = this.constants.state.COMPLETED.html;
    }
    if (state === this.constants.state.ARCHIVED.data) {
      this.suffix = this.constants.state.ARCHIVED.suffix;
      this.htmlState = this.constants.state.ARCHIVED.html;
    }
  };

  return TodoItem;
});