document.getElementById('subscriberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const registrationNumber = "NOT YET AVAILABLE"; // Default value
    const profileCode = "NOT YET AVAILABLE"; // Default value
    const examTownCode = "NOT YET AVAILABLE"; // Default value

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const paymentType = document.getElementById('paymentType').value;
    const score = document.getElementById('score').value;

    const paymentImage = document.getElementById('paymentImage') ? document.getElementById('paymentImage').files[0] : null;

    if (!paymentImage) {
        alert("Please upload an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const subscriberData = {
            fullName,
            registrationNumber,
            profileCode,
            examTownCode,
            paymentImage: e.target.result,
            paymentMethod,
            paymentType,
            score
        };

        // Send data to the mock API
        fetch('https://670011894da5bd2375531586.mockapi.io/DATABASE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriberData),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').innerText = 'Submission Successful!';
            document.getElementById('subscriberForm').reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("There was an error submitting the form.");
        });
    };

    reader.readAsDataURL(paymentImage);
});
