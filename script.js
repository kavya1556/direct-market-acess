// Function to register a new user
function registerUser() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    console.log('Registered Users:', users);
    console.log('Attempting to register:', email);

    if (users.find(user => user.email === email)) {
        alert('User already exists. Please log in.');
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
    location.href = 'login.html';
}

// Function to log in a user
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log('Registered Users:', users);
    console.log('Attempting to log in with:', email, password);

    const user = users.find(user => user.email === email && user.password === password);
    
    const errorMessage = document.getElementById('error-message');
    
    if (user) {
        errorMessage.textContent = '';
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid credentials. Try again.';
    }
}

// Function to add a new product
function addProduct() {
    const productName = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    
    if (productName && price) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ productName, price });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to display products
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${product.productName} - $${product.price} 
            <button onclick="deleteProduct(${index})">Delete</button>`;
        productList.appendChild(listItem);
    });
}

// Function to delete a product
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Function to send a message
function sendMessage() {
    const message = document.getElementById('message').value;
    const messageList = document.getElementById('message-list');
    
    const li = document.createElement('li');
    li.textContent = message;
    messageList.appendChild(li);
    document.getElementById('message').value = '';
}

// Function to log out the user
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    location.href = 'index.html';
}

// Function to load products on dashboard load
document.addEventListener('DOMContentLoaded', displayProducts);

// Function to submit a review
function submitReview() {
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    if (review && rating) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ review, rating });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert('Review submitted successfully');
    } else {
        alert('Please fill in both the review and the rating');
    }
}

// Function to display reviews
function displayReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviews.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `Rating: ${r.rating} - Review: ${r.review}`;
        reviewList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayReviews);
