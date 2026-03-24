// feedback.js - JavaScript for feedback form functionality

document.addEventListener('DOMContentLoaded', function() {
    // Character counter for message textarea
    const message = document.getElementById('message');
    const counter = document.getElementById('counter');

    if (message && counter) {
        message.addEventListener('input', function() {
            const left = 300 - message.value.length;
            counter.textContent = `${left} characters remaining`;
            counter.classList.remove('warning', 'danger');
            if (left < 30) counter.classList.add('danger');
            else if (left < 80) counter.classList.add('warning');
        });
    }

    // Programme card selection → update hidden field
    const radios = document.querySelectorAll('input[name="program"]');
    const hidden = document.getElementById('selected_program');

    radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (radio.checked) hidden.value = radio.value;
        });
    });

    // Form submit validation
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const program = hidden?.value;

            if (!name) {
                alert('Please enter your full name.');
                return;
            }
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email.');
                return;
            }
            if (!program) {
                alert('Please select a programme that interests you.');
                return;
            }

            // Here you could add AJAX to send data to server
            alert('Thank you for your feedback! 🌱 We will get back to you soon.');

            // Reset form
            feedbackForm.reset();
            if (counter) counter.textContent = '300 characters remaining';
            counter?.classList.remove('warning', 'danger');
            if (hidden) hidden.value = '';
        });
    }
});