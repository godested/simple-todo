define(function () {
  var TodoItem = function (options) {
    options = options || {};

    this.title = options.title || '';
    this.description = options.description || '';
    this.id = options.id;
    this.state = this.contants.state.NEW.data;
    this.htmlState = this.contants.state.NEW.html;
    this.suffix = this.contants.state.NEW.suffix;

    this.setNewState = this.setNewState.bind(this);
  };

  TodoItem.prototype.contants = {
    state: {
      NEW: {
        data :'new',
        suffix: 'primary',
        html: 'New'
      },
      IN_PROGRESS: {
        data:'in-progress',
        suffix: 'info',
        html: 'In progress'
      },
      COMPLETED: {
        data: 'completed',
        suffix: 'success',
        html: 'Completed'
      },
      ARCHIVED:{
        data: 'archived',
        suffix: 'secondary',
        html: 'Archived'
      }
    }
  };

  TodoItem.prototype.setNewState = function (state) {
    this.state = state;

    if (state === this.contants.state.NEW.data) {
      this.suffix = this.contants.state.NEW.suffix;
      this.htmlState = this.contants.state.NEW.html;
    }
    if (state === this.contants.state.IN_PROGRESS.data) {
      this.suffix = this.contants.state.IN_PROGRESS.suffix;
      this.htmlState = this.contants.state.IN_PROGRESS.html;
    }
    if (state === this.contants.state.COMPLETED.data) {
      this.suffix = this.contants.state.COMPLETED.suffix;
      this.htmlState = this.contants.state.COMPLETED.html;
    }
    if (state === this.contants.state.ARCHIVED.data) {
      this.suffix = this.contants.state.ARCHIVED.suffix;
      this.htmlState = this.contants.state.ARCHIVED.html;
    }
  };

  return TodoItem;
});