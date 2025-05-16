// Get all form elements
const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// General validation function that handles common validation tasks
function validateField(input, errorElementId, customValidation = null) {
    const errorElement = document.getElementById(errorElementId);
    
    // Clear previous error messages and styling
    errorElement.textContent = '';
    input.classList.remove('valid', 'invalid');
    
    // Set custom validity message if empty and required
    if (input.required && input.value.trim() === '') {
        input.setCustomValidity('This field is required');
    } else {
        input.setCustomValidity('');
        
        // Apply custom validation if provided
        if (customValidation) {
            customValidation(input);
        }
    }
    
    // Check validity using HTML5 validation
    const isValid = input.checkValidity();
    
    // Update UI based on validity
    if (!isValid) {
        // Show appropriate error message
        if (input.validity.valueMissing) {
            errorElement.textContent = 'This field is required';
        } else if (input.validity.typeMismatch) {
            errorElement.textContent = 'Please enter a valid value';
        } else if (input.validity.tooShort) {
            errorElement.textContent = `Minimum length is ${input.minLength} characters`;
        } else if (input.validity.tooLong) {
            errorElement.textContent = `Maximum length is ${input.maxLength} characters`;
        } else if (input.validity.patternMismatch) {
            errorElement.textContent = 'Please match the requested format';
        } else {
            errorElement.textContent = input.validationMessage;
        }
        
        input.classList.add('invalid');
    } else {
        input.classList.add('valid');
    }
    
    return isValid;
}

// Username-specific validation
function validateUsername() {
    return validateField(usernameInput, 'usernameError', (input) => {
        // Add custom username validation if needed
        const value = input.value.trim();
        
        // Example: Only allow alphanumeric characters and underscores
        if (!/^[a-zA-Z0-9_]+$/.test(value) && value !== '') {
            input.setCustomValidity('Username can only contain letters, numbers, and underscores');
        }
    });
}

// Email-specific validation
function validateEmail() {
    return validateField(emailInput, 'emailError', (input) => {
        // Email validation is mostly handled by the browser with type="email"
        // But we can add additional custom checks if needed
        const value = input.value.trim();
        
        // Example: Require a specific domain (optional)
        // if (value && !value.endsWith('@example.com')) {
        //     input.setCustomValidity('Email must be from example.com domain');
        // }
    });
}

// Password-specific validation
function validatePassword() {
    return validateField(passwordInput, 'passwordError', (input) => {
        const value = input.value;
        
        // Check for strong password
        if (value !== '') {
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
                input.setCustomValidity('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            }
        }
    });
}

// Confirm password validation
function validateConfirmPassword() {
    return validateField(confirmPasswordInput, 'confirmPasswordError', (input) => {
        if (input.value !== passwordInput.value) {
            input.setCustomValidity('Passwords do not match');
        }
    });
}

// Event listeners for real-time validation
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
    validatePassword();
    // Re-validate confirm password field if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Form submission event
form.addEventListener('submit', (event) => {
    // Validate all fields
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // Prevent form submission if any validation fails
    if (!(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid)) {
        event.preventDefault();
        alert('Please fix the errors in the form before submitting.');
    } else {
        // Form is valid - in a real app, you would submit the form
        event.preventDefault(); // For demo purposes
        alert('Form submitted successfully!');
        form.reset();
        
        // Reset all validation styling
        document.querySelectorAll('.form-group-signup input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        document.querySelectorAll('.error-message-signup').forEach(span => {
            span.textContent = '';
        });
    }
});