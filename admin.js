function editSubscriber(index) {
    fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers/' + (index + 1))
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
            fetch('https://6701fb99b52042b542d8eb58.mockapi.io/Subscribers/' + (index + 1), {
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
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching subscriber:', error);
        });
}
