# Form Validation Tutorial

A concise, step-by-step guide to building a "Create Account" form with HTML5, CSS, and JavaScript—you'll learn baseline validation, custom error messages, and real-time feedback, plus GitHub version control best practices.

---

## Prerequisites

* Basic HTML, CSS, and JavaScript knowledge
* Git installed
* A code editor and a modern browser

---

## Step 1: Set Up Your Project

1. **Create a folder** called `form-validation` and `cd` into it:

   ```bash
   mkdir form-validation && cd form-validation
   ```

2. **Initialize Git**:

   ```bash
   git init
   ```

3. **Create files**:

   * `index.html`
   * `styles.css`
   * `script.js`

4. **First commit**:

   ```bash
   git add .
   git commit -m "chore: initial project structure"
   ```

---

## Step 2: Build the HTML (`index.html`)

Create a simple sign-up form with proper IDs and required attributes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <script src="script.js" defer></script>
  <title>Create Account</title>
</head>
<body>
  <div class="container-signup-form">
    <h2>Create Account</h2>
    <form id="signupForm" novalidate>
      <label for="username">Username:</label>
      <input id="username" name="username" type="text" required />
      <span id="usernameError" class="error-message"></span>

      <label for="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <span id="emailError" class="error-message"></span>

      <label for="password">Password:</label>
      <input id="password" name="password" type="password" minlength="8" required />
      <span id="passwordError" class="error-message"></span>

      <label for="confirm-password">Confirm Password:</label>
      <input id="confirm-password" name="confirm-password" type="password" required />
      <span id="confirmPasswordError" class="error-message"></span>

      <button type="submit" class="signup-button">Submit</button>
    </form>
  </div>
</body>
</html>
```

> **Tip:** Using `novalidate` disables default browser bubbles so you can show custom messages.

---

## Step 3: Style Validation States (`styles.css`)

Add clear visual feedback:

```css
body { font-family: sans-serif; }
.container-signup-form { /* centered card */ }

input:invalid    { border: 1px solid red; background: #ffe0e0; }
input:valid      { border: 1px solid green; }
.error-message   { color: red; font-size: 0.9em; min-height: 1em; }
.signup-button   { /* button styles */ }
```

> **Best Practice:** Keep your styles focused on clarity—red for errors, green for success.

---

## Step 4: Add JavaScript Validation (`script.js`)

Implement real-time checks with clear comments:

```js
// Grab elements
t const form = document.getElementById('signupForm');
// ...other inputs

// Generic validator
function validateField(input, errorId, customFn) {
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = '';
  input.classList.remove('valid','invalid');

  // Required check
  if (input.required && !input.value.trim()) {
    input.setCustomValidity('This field is required');
  } else {
    input.setCustomValidity('');
    if (customFn) customFn(input);
  }

  if (!input.checkValidity()) {
    errorEl.textContent = input.validationMessage;
    input.classList.add('invalid');
    return false;
  }

  input.classList.add('valid');
  return true;
}

// Password rules
function validatePassword() {
  return validateField(passwordInput, 'passwordError', (i) => {
    const v = i.value;
    const hasSpecial = /[^A-Za-z0-9]/.test(v);
    // ...uppercase, lowercase, number checks
    if (!hasSpecial /* or other checks */) {
      i.setCustomValidity('Password needs uppercase, lowercase, number, special char');
    }
  });
}

// Bind events
passwordInput.addEventListener('input', validatePassword);
form.addEventListener('submit', (e) => {
  if (!validatePassword() /* || other fields */) {
    e.preventDefault();
    alert('Fix errors before submitting');
  }
});
```

> **Note:** Focus on one function at a time—validateField handles the common logic.

---

## Step 5: Test Locally

1. Open `index.html` in your browser.
2. Leave fields empty and submit—errors should appear.
3. Enter valid data—fields turn green and you see "Form submitted successfully!".

---

## Step 6: GitHub Version Control

1. **Commit often**: small, logical commits (e.g., `feat: add HTML structure`, `style: add CSS feedback`).
2. **Write clear messages**: start with type (`feat`, `fix`, `chore`) and describe the change.
3. **Push to remote**:

   ```bash
   git remote add origin <git-url>
   git branch -M main
   git push -u origin main
   ```
4. **Use branches** for new features or bugfixes:

   ```bash
   git checkout -b feature/custom-validation
   ```
5. **Open a Pull Request** on GitHub to review and merge.

> **Pro Tip:** Tag releases (e.g., `v1.0.0`) for milestones:

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

Congratulations! You now have a fully validated sign-up form with best practices in place.
