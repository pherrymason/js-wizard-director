
const currentStepSymbol = Symbol();
const totalStepsSymbol = Symbol();

export class Director {
    constructor (dataObject, stepControllers) {
        this.stepControllers = stepControllers;
        this[currentStepSymbol] = 0;
        this[totalStepsSymbol] = stepControllers.length;
        this.configureControllers();
        this.dataObject = dataObject;
    }

    configureControllers() {
        this.stepControllers.forEach(function(controller) {
            controller.on('next', this.goNext.bind(this));
            controller.on('prev', this.goPrev.bind(this));
        }.bind(this));
    }

    get step() {
        return this[currentStepSymbol];
    }

    set step(value) {
        this[currentStepSymbol] = value;
    }

    increseStep () {
        if (this.step < (this[totalStepsSymbol]-1)) {
            this.step ++;
        } else {
            this.step = 0;
        }

        return this.step;
    }

    decreaseStep () {
        if (this.step > 0) {
            this.step --;
        } else {
            this.step = this[totalStepsSymbol] - 1;
        }

        return this.step;
    }

    goNext() {
        const previousStep = this.step;
        const nextStep = this.increseStep();
        console.log('Go to step '+nextStep);
        const prevController = this.getController(previousStep);
        prevController.exit(this.dataObject);

        const nextController = this.getController(nextStep);
        nextController.enter(this.dataObject);
    }

    goPrev() {
        const previousStep = this.step;
        const nextStep = this.decreaseStep();
        console.log('Go to step '+nextStep);
        const prevController = this.getController(previousStep);
        prevController.exit(this.dataObject);

        const nextController = this.getController(nextStep);
        nextController.enter(this.dataObject);
    }

    getController(step) {
        if (typeof this.stepControllers[step] === 'undefined') {
            throw 'Incorrect step '+step+' reached';
        }

        return this.stepControllers[step];
    }

    start() {
        const controller = this.getController(this.step);
        controller.enter(this.dataObject);
    }
}