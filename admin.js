document.getElementById('viewSubscribers').addEventListener('click', function() {
    fetch('https://670011894da5bd2375531586.mockapi.io/DATABASE')
        .then(response => response.json())
        .then(data => {
            const subscribersList = document.getElementById('subscribersList');

            // Clear previous list
            subscribersList.innerHTML = '';

            if (data.length === 0) {
                subscribersList.innerHTML = '<p>No subscribers found.</p>';
                return;
            }

            const table = `
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Full Name</th>
                            <th>Registration Number</th>
                            <th>Profile Code</th>
                            <th>Exam Town Code</th>
                            <th>Payment Image</th>
                            <th>Payment Method</th>
                            <th>Payment Type</th>
                            <th>Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(subscriber => `
                            <tr>
                                <td>${subscriber.id}</td>
                                <td>${subscriber.fullName}</td>
                                <td>${subscriber.registrationNumber || "NOT YET AVAILABLE"}</td>
                                <td>${subscriber.profileCode || "NOT YET AVAILABLE"}</td>
                                <td>${subscriber.examTownCode || "NOT YET AVAILABLE"}</td>
                                <td><img src="${subscriber.paymentImage}" alt="Payment Image" style="max-width: 100px;"/></td>
                                <td>${subscriber.paymentMethod}</td>
                                <td>${subscriber.paymentType}</td>
                                <td>${subscriber.score}</td>
                                <td><button onclick="editSubscriber('${subscriber.id}')">Edit</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            subscribersList.innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching subscribers:', error);
            alert('There was an error fetching the subscribers.');
        });
});

function editSubscriber(id) {
    fetch(`https://670011894da5bd2375531586.mockapi.io/DATABASE/${id}`)
        .then(response => response.json())
        .then(subscriber => {
            const fullName = prompt("Edit Full Name:", subscriber.fullName);
            const registrationNumber = prompt("Edit Registration Number:", subscriber.registrationNumber || "NOT YET AVAILABLE");
            const profileCode = prompt("Edit Profile Code:", subscriber.profileCode || "NOT YET AVAILABLE");
            const examTownCode = prompt("Edit Exam Town Code:", subscriber.examTownCode || "NOT YET AVAILABLE");
            const paymentMethod = prompt("Edit Payment Method (Direct System / Direct Mobile):", subscriber.paymentMethod);
            const paymentType = prompt("Edit Payment Type (Full Payment / Half Payment / Part Payment):", subscriber.paymentType);
            const score = prompt("Edit Score:", subscriber.score);

            const newPaymentImage = confirm("Would you like to upload a new image?");

            if (newPaymentImage) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.onchange = function() {
                    const file = fileInput.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const updatedSubscriber = {
                                fullName: fullName || subscriber.fullName,
                                registrationNumber: registrationNumber || "NOT YET AVAILABLE",
                                profileCode: profileCode || "NOT YET AVAILABLE",
                                examTownCode: examTownCode || "NOT YET AVAILABLE",
                                paymentImage: e.target.result,
                                paymentMethod: paymentMethod || subscriber.paymentMethod,
                                paymentType: paymentType || subscriber.paymentType,
                                score: score || subscriber.score
                            };

                            updateSubscriber(id, updatedSubscriber);
                        };
                        reader.readAsDataURL(file);
                    }
                };
                fileInput.click();
            } else {
                const updatedSubscriber = {
                    fullName: fullName || subscriber.fullName,
                    registrationNumber: registrationNumber || "NOT YET AVAILABLE",
                    profileCode: profileCode || "NOT YET AVAILABLE",
                    examTownCode: examTownCode || "NOT YET AVAILABLE",
                    paymentImage: subscriber.paymentImage,
                    paymentMethod: paymentMethod || subscriber.paymentMethod,
                    paymentType: paymentType || subscriber.paymentType,
                    score: score || subscriber.score
                };

                updateSubscriber(id, updatedSubscriber);
            }
        })
        .catch(error => {
            console.error('Error fetching subscriber:', error);
            alert('There was an error fetching the subscriber data.');
        });
}

function updateSubscriber(id, updatedData) {
    fetch(`https://670011894da5bd2375531586.mockapi.io/DATABASE/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert("Subscriber details updated!");
        document.getElementById('viewSubscribers').click(); // Refresh the list
    })
    .catch(error => {
        console.error('Error updating subscriber:', error);
        alert('There was an error updating the subscriber.');
    });
}

// Logout functionality
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('adminLoggedIn'); // Clear admin session
    window.location.href = "login.html"; // Redirect to login page
});
