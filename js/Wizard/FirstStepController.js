import {StepController} from './StepController';
var $ = require('jquery');

export class FirstStepController extends StepController {
    enter(dataObject) {
        this.$wrapper = $('#step1');
        super.enter(dataObject);
        console.log('enter step 1');
        this.$wrapper.on('click', '.btn-primary', this.onClickSave.bind(this));
    }

    exit(dataObject) {
        super.exit(dataObject);

        dataObject.User.name = this.$wrapper.find('input[name=name]').val();

        console.log('exit step 1');
        this.$wrapper.off('click', '.btn-primary');
    }

    onClickSave(event) {
        this.goNext();
    }
}