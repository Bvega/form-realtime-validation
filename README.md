# Create Account Form with HTML5 & JavaScript Validation

A simple sign-up form demonstrating:

- **HTML5 validation attributes** (`required`, `minlength`, `type="email"`, etc.)  
- **CSS styling** for valid/invalid states  
- **Custom error messages** and **real-time validation** using the Constraint Validation API in JavaScript  

---

## 📂 Project Structure

/ (project root)
├─ index.html
├─ styles.css
├─ script.js
└─ README.md

---

## 🚀 Getting Started

1. **Clone or download** this repository.  
2. Open `index.html` in your browser.  

No build tools or server required—just a modern browser.

---

## 📝 Usage

1. Fill out **Username**, **Email**, **Password**, and **Confirm Password**.  
2. The form will prevent submission until:  
   - All fields are non-empty.  
   - Email is in valid format.  
   - Password is at least 8 characters and contains an uppercase letter, lowercase letter, number, and special character.  
   - Confirm Password matches Password.  
3. Error messages appear below each field.  
4. On successful validation, an alert “Form submitted successfully!” is shown (demo mode).

---

## 🔧 How It Works

- **HTML5 attributes** provide baseline validation.  
- **CSS** (`input.valid` / `input.invalid`) highlights fields.  
- **JavaScript** (`script.js`):
  - Hooks into the form’s `submit` event.  
  - Uses `checkValidity()`, `setCustomValidity()` and custom regex checks.  
  - Displays messages in `<span>` elements below each input.  
  - Listens on `input` events for real-time feedback.

---

## 🛠️ Commands

After creating/updating files, you can commit like so:

```bash
git add index.html styles.css script.js README.md
git commit -m "Add sign-up form with HTML5 and JS validation, plus README"

 Learning Outcomes
Applying HTML5 validation attributes

Styling form feedback with CSS pseudo-classes

Using the Constraint Validation API for custom logic

Structuring a beginner-friendly project

📄 License
This project is open-source and available under the MIT License.

