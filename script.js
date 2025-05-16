// Get all form elements
const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

/**
 * validateField:
 * - Clears previous error and styling.
 * - Sets custom validity if the field is required and empty.
 * - Applies any extra custom validation logic.
 * - Checks HTML5 validity and updates the UI (valid/invalid classes and error messages).
 */
function validateField(input, errorElementId, customValidation = null) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = '';                   // Clear old message
  input.classList.remove('valid', 'invalid');      // Reset styling

  // If required and empty, set a default message
  if (input.required && input.value.trim() === '') {
    input.setCustomValidity('This field is required');
  } else {
    input.setCustomValidity('');                   // Clear custom messages
    if (customValidation) customValidation(input); // Run extra checks
  }

  const isValid = input.checkValidity();           // Perform HTML5 check

  if (!isValid) {
    // Determine the correct error message
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
    input.classList.add('invalid');               // Apply invalid styling
  } else {
    input.classList.add('valid');                 // Apply valid styling
  }

  return isValid;                                 // Return validation status
}

// Username-specific validation
function validateUsername() {
  return validateField(usernameInput, 'usernameError', (input) => {
    const value = input.value.trim();
    if (value !== '' && !/^[a-zA-Z0-9_]+$/.test(value)) {
      input.setCustomValidity(
        'Username may only contain letters, numbers, and underscores'
      );
    }
  });
}

// Email-specific validation
function validateEmail() {
  return validateField(emailInput, 'emailError');
}

// Password-specific validation
function validatePassword() {
  return validateField(passwordInput, 'passwordError', (input) => {
    const value = input.value;
    if (value) {
      const hasUppercase   = /[A-Z]/.test(value);
      const hasLowercase   = /[a-z]/.test(value);
      const hasNumber      = /\d/.test(value);
      // Now catches any non-alphanumeric character as "special"
      const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

      if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
        input.setCustomValidity(
          'Password must include uppercase, lowercase, number, and special character'
        );
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

// Real-time validation event listeners
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
  validatePassword();
  if (confirmPasswordInput.value) validateConfirmPassword();
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// On form submission, validate all fields
form.addEventListener('submit', (event) => {
  const validUsername = validateUsername();
  const validEmail    = validateEmail();
  const validPassword = validatePassword();
  const validConfirm  = validateConfirmPassword();

  if (!(validUsername && validEmail && validPassword && validConfirm)) {
    event.preventDefault(); // Stop submission if any fail
    alert('Please fix the errors before submitting.');
  } else {
    event.preventDefault(); // Demo: prevent actual submit
    alert('Form submitted successfully!');
    form.reset();          // Clear form
    // Reset all validation styling
    document
      .querySelectorAll('.form-group-signup input')
      .forEach((i) => i.classList.remove('valid', 'invalid'));
    document
      .querySelectorAll('.error-message-signup')
      .forEach((s) => (s.textContent = ''));
  }
});
