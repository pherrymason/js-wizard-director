import {StepController} from './StepController';
const $ = require('jquery');

export class SecondStepController extends StepController {
    enter(dataObject) {
        this.$wrapper = $('#step2');
        super.enter(dataObject);
        console.log('enter step 2');
        this.$wrapper.find('#label-welcome .value').text(dataObject.User.name);
        this.$wrapper.on('click', '.btn-primary', this.onClickSave.bind(this));
    }

    exit(dataObject) {
        super.exit(dataObject);
        console.log('exit step 2');
        dataObject.User.phone = this.$wrapper.find('input[name=phone]').val();
        this.$wrapper.off('click', '.btn-primary');
    }

    onClickSave(event) {
        this.goNext();
    }
}