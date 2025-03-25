/**
 * JavaScript file to handle CV language and theme changes
 * Includes functions for:
 * - Switching between English and Spanish
 * - Switching between different visual themes
 * - Persisting user preferences
 */

const BASE_PATH="assets/css/"

/**
 * Changes language by redirecting to selected version
 * @param {string} value - URL of selected language HTML file
 */
function changeLanguage(value) {
    window.location.href = value;
}

/**
 * Changes CV theme and saves preference
 * @param {string} value - Path to selected theme CSS file
 */
function changeTheme(value) {
    document.getElementById('themeLink').href = BASE_PATH + value;
    localStorage.setItem('preferredTheme', value);
}

/**
 * Initializes theme based on saved preferences
 */
window.onload = function() {
    const savedTheme = localStorage.getItem('preferredTheme');
    
    if (savedTheme) {
        document.getElementById('themeLink').href = BASE_PATH + savedTheme;
        document.getElementById('themeSelect').value = savedTheme;
    }
};
