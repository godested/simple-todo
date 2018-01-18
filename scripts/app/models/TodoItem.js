define(function () {
  var id = 0;

  var TodoItemModel = function (options) {
    this.title = options.title || '';
    this.description = options.description || '';
    this.id = options.id ||id++;
    this.state = this.constants.state.NEW;
    this.html = this.getHTML();

    this.getHTML = this.getHTML.bind(this);
  };

  TodoItemModel.prototype.constants = {
    state: {
      NEW: 'new',
      IN_PROGRESS: 'in-progress',
      COMPLETED: 'completed',
      ARCHIVED: 'archived'
    },
    className: {
      NEW: 'badge-primary',
      IN_PROGRESS: 'badge-info',
      COMPLETED: 'badge-success',
      ARCHIVED: 'badge-secondary'
    },
    innerHTML: {
      NEW: 'New',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      ARCHIVED: 'Archived'
    }
  };

  TodoItemModel.prototype.getHTML = function () {
    switch (this.state) {
      case (this.constants.state.NEW): {
        return {
          className: this.constants.className.NEW,
          innerHTML: this.constants.innerHTML.NEW
        };
      }
      case (this.constants.state.IN_PROGRESS): {
        return {
          className: this.constants.className.IN_PROGRESS,
          innerHTML: this.constants.innerHTML.IN_PROGRESS
        };
      }
      case (this.constants.state.COMPLETED): {
        return {
          className: this.constants.className.COMPLETED,
          innerHTML: this.constants.innerHTML.COMPLETED
        };
      }
      case (this.constants.state.ARCHIVED): {
        return {
          className: this.constants.className.ARCHIVED,
          innerHTML: this.constants.innerHTML.ARCHIVED
        };
      }
    }
  };

  return TodoItemModel;
});