document.getElementById('subscriberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const registrationNumber = "NOT YET AVAILABLE"; // Default value
    const profileCode = "NOT YET AVAILABLE"; // Default value
    const examTownCode = "NOT YET AVAILABLE"; // Default value
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const paymentType = document.getElementById('paymentType').value;
    const score = document.getElementById('score').value;

    const newSubscriber = {
        fullName,
        registrationNumber,
        profileCode,
        examTownCode,
        paymentMethod,
        paymentType,
        score
    };

    // Check if the subscriber is already registered
    checkIfRegistered(fullName)
        .then(isRegistered => {
            if (isRegistered) {
                document.getElementById('message').innerText = 'You are already registered.';
            } else {
                // Submit the new subscriber data
                submitSubscriber(newSubscriber);
            }
        })
        .catch(error => {
            console.error('Error checking registration:', error);
            document.getElementById('message').innerText = 'Error checking registration.';
        });
});

async function checkIfRegistered(fullName) {
    const response = await fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers');
    const subscribers = await response.json();
    
    // Check if the fullName exists in the subscribers
    return subscribers.some(subscriber => subscriber.fullName.toLowerCase() === fullName.toLowerCase());
}

function submitSubscriber(subscriber) {
    fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriber)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('message').innerText = 'Submission Successful!';
        document.getElementById('subscriberForm').reset();
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        document.getElementById('message').innerText = 'Error submitting form.';
    });
}
