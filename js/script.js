<<<<<<< HEAD
var navToggle = document.getElementById('nav-toggle');
var navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('is-open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
        }
    });
}

var DEFAULT_SETTINGS = {
    theme: 'light',
    visitorName: '',
    lastVisit: new Date().toISOString()
};

function createDefaultSettings() {
    return {
        theme: DEFAULT_SETTINGS.theme,
        visitorName: DEFAULT_SETTINGS.visitorName,
        lastVisit: new Date().toISOString()
    };
}

function loadSettings() {
    var fallback = createDefaultSettings();
    try {
        var rawData = localStorage.getItem('app_settings');
        if (!rawData) {
            return fallback;
        }

        var parsedData = JSON.parse(rawData);
        if (typeof parsedData !== 'object' || parsedData === null) {
            return fallback;
        }

        return {
            theme: (parsedData.theme === 'dark' || parsedData.theme === 'light') ? parsedData.theme : fallback.theme,
            visitorName: typeof parsedData.visitorName === 'string' ? parsedData.visitorName : fallback.visitorName,
            lastVisit: typeof parsedData.lastVisit === 'string' ? parsedData.lastVisit : fallback.lastVisit
        };
    } catch (error) {
        console.warn('Corrupt app_settings in Local Storage. Using documented defaults.', error);
        return fallback;
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem('app_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Could not save settings to Local Storage:', error);
    }
}

var currentSettings = loadSettings();
currentSettings.lastVisit = new Date().toISOString();
saveSettings(currentSettings);

var darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    if (currentSettings.theme === 'dark') {
        document.body.classList.add('dark-theme');
        darkModeToggle.textContent = '☀︎';
    } else {
        darkModeToggle.textContent = '⏾';
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            currentSettings.theme = 'dark';
            darkModeToggle.textContent = '☀︎';
        } else {
            currentSettings.theme = 'light';
            darkModeToggle.textContent = '⏾';
        }
        saveSettings(currentSettings);
    });
}

var nameInput = document.getElementById('name');
if (nameInput && currentSettings.visitorName) {
    nameInput.value = currentSettings.visitorName;
}

var servicesData = [
    { service: "Graphic Design", price: "Php 700-1500" },
    { service: "Digital Art", price: "Php 500-1500" }
];

var servicesBody = document.getElementById('services-body');

if (servicesBody) {
    var outputHTML = '';
    servicesData.forEach(function(item) {
        outputHTML += '<tr>' +
            '<th scope="row">' + item.service + '</th>' +
            '<td>' + item.price + '</td>' +
            '</tr>';
    });
    servicesBody.innerHTML = outputHTML;
}

var contactForm = document.getElementById('contact-form');
var formFeedback = document.getElementById('form-feedback');

function isValidEmail(value) {
    var trimmed = value.trim();
    var atIndex = trimmed.indexOf('@');
    var dotIndex = trimmed.lastIndexOf('.');

if (atIndex < 1) {
        return false;
    }
    if (dotIndex <= atIndex + 1) {
        return false;
    }
    if (dotIndex >= trimmed.length - 1) {
        return false;
    }
    if (trimmed.indexOf(' ') !== -1) {
        return false;
    }
    return true;
}


if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');
        var messageField = document.getElementById('message');

        var nameError = document.getElementById('name-error');
        var emailError = document.getElementById('email-error');
        var messageError = document.getElementById('message-error');

        var nameValue = nameField ? nameField.value.trim() : '';
        var emailValue = emailField ? emailField.value.trim() : '';
        var messageValue = messageField ? messageField.value.trim() : '';

        var isValid = true;

        if (nameError) {
            nameError.textContent = '';
        }
        if (emailError) {
            emailError.textContent = '';
        }
        if (messageError) {
            messageError.textContent = '';
        }
        if (formFeedback) {
            formFeedback.textContent = '';
        }

        if (nameValue === '') {
            if (nameError) {
                nameError.textContent = 'Please enter your name.';
            }
            isValid = false;
        }

        if (emailValue === '') {
            if (emailError) {
                emailError.textContent = 'Please enter your email address.';
            }
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            if (emailError) {
                emailError.textContent = 'Please enter a valid email address (like name@example.com).';
            }
            isValid = false;
        }

        if (messageValue === '') {
            if (messageError) {
                messageError.textContent = 'Please enter a message.';
            }
            isValid = false;
        }

        if (!isValid) {
            if (formFeedback) {
                formFeedback.textContent = 'Please fix the highlighted fields above.';
                formFeedback.style.color = 'red';
            }
            return;
        }

        currentSettings.visitorName = nameValue;
        saveSettings(currentSettings);

        if (formFeedback) {
            formFeedback.textContent = 'Thank you! Your message has been submitted successfully.';
            formFeedback.style.color = 'green';
        }
        contactForm.reset();
    });
}
=======
var navToggle = document.getElementById('nav-toggle');
var navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('is-open');
    });

    document.addEventListener('click', function(event) {
        var isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
        }
    });
}

var DEFAULT_SETTINGS = {
    theme: 'light',
    visitorName: '',
    lastVisit: new Date().toISOString()
};

function loadSettings() {
   try {
        var rawData = localStorage.getItem('app_settings');
        if (!rawData) return { ...DEFAULT_SETTINGS };
        
        var parsedData = JSON.parse(rawData);
        
        if (typeof parsedData !== 'object' || parsedData === null) {
            return { ...DEFAULT_SETTINGS };
        }

        return { ...DEFAULT_SETTINGS, ...parsedData };
    } catch (error) {
        console.warn('Local Storage data was corrupt or unreadable. Falling back to defaults.', error);
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem('app_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings to Local Storage:', error);
    }
}

var currentSettings = loadSettings();
currentSettings.lastVisit = new Date().toISOString();
saveSettings(currentSettings);

var darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    if (currentSettings.theme === 'dark') {
        document.body.classList.add('dark-theme');
        darkModeToggle.textContent = '☀︎';
    } else {
        darkModeToggle.textContent = '⏾';
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            currentSettings.theme = 'dark';
            darkModeToggle.textContent = '☀︎';
        } else {
            currentSettings.theme = 'light';
            darkModeToggle.textContent = '⏾';
        }
        saveSettings(currentSettings);
    });
}

var nameInput = document.getElementById('name');
if (nameInput && currentSettings.visitorName) {
    nameInput.value = currentSettings.visitorName;
}

var servicesData = [
    { service: "Graphic Design", price: "Php 700-1500" },
    { service: "Digital Art", price: "Php 500-1500" }
];

var servicesBody = document.getElementById('services-body');

if (servicesBody) {
    var outputHTML = '';
    for (var i = 0; i < servicesData.length; i++) {
        outputHTML += '<tr>' +
            '<th scope="row">' + servicesData[i].service + '</th>' +
            '<td>' + servicesData[i].price + '</td>' +
            '</tr>';
    }
    servicesBody.innerHTML = outputHTML;
}

var contactForm = document.getElementById('contact-form');
var formFeedback = document.getElementById('form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        var nameValue = document.getElementById('name').value;
        var emailValue = document.getElementById('email').value;
        var messageValue = document.getElementById('message').value;
        if (nameValue === '' || emailValue === '' || messageValue === '') {
            event.preventDefault(); 
            formFeedback.textContent = 'Please fill out all required fields before sending.';
            formFeedback.style.color = 'red';
        }   
       else {
            event.preventDefault(); 
            currentSettings.visitorName = nameValue;
            saveSettings(currentSettings);

            formFeedback.textContent = 'Thank you! Your message is submitted succesfully.';
            formFeedback.style.color = 'green';
            contactForm.reset();
        }
    });
}
>>>>>>> c439f6ee63d00222c973c79ce439252496c9eacd
