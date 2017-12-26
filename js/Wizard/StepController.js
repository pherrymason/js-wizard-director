const Events = require('minivents');

export class StepController {
    constructor() {
        // Make StepController able to emit an listen events
        Events(this);
    }

    enter(dataObject) {
        this.$wrapper.removeClass('step--disabled');
    }

    exit(dataObject) {
        this.$wrapper.addClass('step--disabled');
    }

    goNext() {
        this.emit('next');
    }

    goPrev() {
        this.emit('prev');
    }
}

