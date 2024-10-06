document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewSubscribers').addEventListener('click', function() {
        fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers')
            .then(response => response.json())
            .then(subscribers => {
                const subscribersList = document.getElementById('subscribersList');

                // Clear previous list
                subscribersList.innerHTML = '';

                if (subscribers.length === 0) {
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
                                <th>Payment Method</th>
                                <th>Payment Type</th>
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${subscribers.map((subscriber, index) => `
                                <tr>
                                    <td>${subscriber.id}</td> <!-- Assuming 'id' is used for serial number -->
                                    <td>${subscriber.fullName}</td>
                                    <td>${subscriber.registrationNumber || "NOT YET AVAILABLE"}</td>
                                    <td>${subscriber.profileCode || "NOT YET AVAILABLE"}</td>
                                    <td>${subscriber.examTownCode || "NOT YET AVAILABLE"}</td>
                                    <td>${subscriber.paymentMethod}</td>
                                    <td>${subscriber.paymentType}</td>
                                    <td>${subscriber.score}</td>
                                    <td><button onclick="editSubscriber(${subscriber.id})">Edit</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                subscribersList.innerHTML = table;
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
                document.getElementById('subscribersList').innerHTML = '<p>Error loading subscribers.</p>';
            });
    });
});

function editSubscriber(id) {
    fetch(`https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers/${id}`)
        .then(response => response.json())
        .then(subscriber => {
            const fullName = prompt("Edit Full Name:", subscriber.fullName);
            const registrationNumber = prompt("Edit Registration Number:", subscriber.registrationNumber || "NOT YET AVAILABLE");
            const profileCode = prompt("Edit Profile Code:", subscriber.profileCode || "NOT YET AVAILABLE");
            const examTownCode = prompt("Edit Exam Town Code:", subscriber.examTownCode || "NOT YET AVAILABLE");
            const paymentMethod = prompt("Edit Payment Method (Direct System / Direct Mobile):", subscriber.paymentMethod);
            const paymentType = prompt("Edit Payment Type (Deposit Payment / Full Payment):", subscriber.paymentType);
            const score = prompt("Edit Score:", subscriber.score);

            // Prepare updated data
            const updatedSubscriber = {
                fullName: fullName || subscriber.fullName,
                registrationNumber: registrationNumber || "NOT YET AVAILABLE",
                profileCode: profileCode || "NOT YET AVAILABLE",
                examTownCode: examTownCode || "NOT YET AVAILABLE",
                paymentMethod: paymentMethod || subscriber.paymentMethod,
                paymentType: paymentType || subscriber.paymentType,
                score: score || subscriber.score
            };

            // Send the updated data to the API
            fetch(`https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSubscriber)
            })
            .then(response => response.json())
            .then(() => {
                alert("Subscriber details updated!");
                document.getElementById('viewSubscribers').click(); // Refresh the list
            })
            .catch(error => {
                console.error('Error updating subscriber:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching subscriber:', error);
        });
}
