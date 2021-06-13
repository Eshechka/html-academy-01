'use strict';

const SettingType = {
    ATTRIBUTE: 'attr',
    CLASS: 'class',
}

const buttonsContainers = document.querySelectorAll('.js-buttons-container');

const clickButtonHandler = (e, settings, buttons) => {
    const button = e.target.closest('button');
    if (!button) return;

    const params = {};

    const {settingName, settingValue} = button.dataset;
    params[settingName] = settingValue;

    applySettings(settings, params, buttons);
}

const setDataAttribute = (selector, params) => {
    const elem = document.querySelector(selector);
    for (const[key, value] of Object.entries(params)) {
        elem.dataset[key] = value;
    }
};

const setClasses = (selector, params, buttons) => {
    const elem = document.querySelector(selector);

    buttons.forEach((button) => {
        const buttonClass = button.dataset.settingValue;
        elem.classList.remove(buttonClass);
    });
    // elem.className = 'cards';

    for (const value of Object.values(params)) {
        elem.classList.add(value);
    }
};

const applySettings = (settings, params, buttons) => {
    const selector = settings.settingTarget;
    if (settings.settingType === SettingType.CLASS) {
        setClasses(selector, params, buttons);
    } else if (settings.settingType === SettingType.ATTRIBUTE) {
        setDataAttribute(selector, params);
    }

    setActiveButton(buttons, params);

    buttons.forEach((button) => {
        if (button.dataset.settingValue === params[button.dataset.settingName]) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

}

function setActiveButton(buttons, params) {
    buttons.forEach((button) => {
        if (button.dataset.settingValue === params[button.dataset.settingName]) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

const init = () => {
    buttonsContainers.forEach((container) => {
        const settings = container.dataset;
        const buttons = container.querySelectorAll('button');

        container.addEventListener('click', (e) => {
            clickButtonHandler(e, settings, buttons);
        });
    });
};

init();
