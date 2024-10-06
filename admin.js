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
                                    <td><button onclick="editSubscriber(${index})">Edit</button></td>
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
