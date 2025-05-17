// Handle Image Classification
document.querySelector('button[type="submit"]')?.addEventListener('click', async function () {
    const fileInput = document.getElementById('file-input');
    const resultContainer = document.getElementById('result');

    if (!fileInput.files || fileInput.files.length === 0) {
        resultContainer.innerText = 'Please upload an image first.';
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            resultContainer.innerText = `Error: ${error.error || 'Failed to fetch prediction'}`;
            return;
        }

        const result = await response.json();
        resultContainer.innerText = `Prediction: ${result.predicted_label}\nConfidence: ${(result.confidence * 100).toFixed(2)}%`;
    } catch (error) {
        console.error('Error:', error);
        resultContainer.innerText = 'Error: Unable to fetch prediction.';
    }
});

// Handle signup
document.getElementById('signup-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        document.getElementById('signup-result').innerText = result.message || result.error;

        if (response.ok) {
            document.getElementById('signup-result').innerText = 'Signup successful! Redirecting to login...';
            setTimeout(() => (window.location.href = '/'), 1500);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('signup-result').innerText = 'Error: Unable to process signup.';
    }
});

// Handle login
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        document.getElementById('login-result').innerText = result.message || result.error;

        if (response.ok) {
            document.getElementById('login-result').innerText = 'Login successful! Redirecting...';
            setTimeout(() => (window.location.href = '/index'), 1000); // Redirect to index page
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('login-result').innerText = 'Error: Unable to log in.';
    }
});

// Handle logout
document.getElementById('logout-button')?.addEventListener('click', async function () {
    try {
        const response = await fetch('/logout', {
            method: 'GET',
        });

        if (response.ok) {
            window.location.href = '/'; // Redirect to the login page
        } else {
            console.error('Logout failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle Image
