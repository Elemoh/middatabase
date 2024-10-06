document.getElementById('subscriberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const registrationNumber = "NOT YET AVAILABLE"; // Default value
    const profileCode = "NOT YET AVAILABLE"; // Default value
    const examTownCode = "NOT YET AVAILABLE"; // Default value

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const paymentType = document.getElementById('paymentType').value;
    const score = document.getElementById('score').value;

    // Prepare data to send to the API
    const subscriberData = {
        fullName,
        registrationNumber,
        profileCode,
        examTownCode,
        paymentMethod,
        paymentType,
        score
    };

    // Send the data to the API
    fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriberData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = 'Submission Successfully!';
        document.getElementById('subscriberForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
