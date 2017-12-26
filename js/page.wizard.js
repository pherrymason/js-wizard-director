import {FirstStepController} from './Wizard/FirstStepController';
import {SecondStepController} from './Wizard/SecondStepController';
import {ThirdStepController} from './Wizard/ThirdStepController';
import {Director} from './Wizard/Director';

var dataObject = {
    User: {
        id: null,
        name: null,
        phone: null
    }
};

const director = new Director(
    dataObject,
    [
        new FirstStepController(),
        new SecondStepController(),
        new ThirdStepController(),
    ]);

console.log('Ready');
director.start();