/*eslint no-unused-vars: "off"*/
/**
 * JavaScript file to handle CV language and theme changes
 * Includes functions for:
 * - Switching between English and Spanish
 * - Switching between different visual themes
 * - Persisting user preferences
 */

const BASE_PATH = 'assets/css/';

/**
 * Changes language by redirecting to selected version
 * @param {string} value - name of selected language HTML file
 */
/* exported changeLanguage */
function changeLanguage(value) {
  window.location.href = `${value}.html`;
}

/**
 * Changes CV theme and saves preference
 * @param {string} value - name of selected theme CSS file
 */
/* exported changeTheme */
function changeTheme(value) {
  document.getElementById('themeLink').href = `${BASE_PATH}${value}.css`;
  localStorage.setItem('preferredTheme', value);
}

/**
 * Initializes theme based on saved preferences
 */
window.onload = function () {
  const savedTheme = localStorage.getItem('preferredTheme');

  if (savedTheme) {
    document.getElementById('themeLink').href = `${BASE_PATH}${savedTheme}.css`;
    document.getElementById('themeSelect').value = savedTheme;
  }
};
