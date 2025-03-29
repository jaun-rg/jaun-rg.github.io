/*eslint no-unused-vars: "off"*/
/**
 * JavaScript file to handle CV versions and theme changes
 * Includes functions for:
 * - Switching between html versions
 * - Switching between different visual themes
 * - Persisting user preferences
 */

const BASE_PATH = 'assets/css/';
const STYLE_SELECT_ID = 'styleSelect';
const VERSION_SELECT_ID = 'versionSelect';
const SWITCHER_CLASS_NAME = 'switchers noPrint';
const THEME_LINK_ID = 'themeLink';
const THEME_ITEM_LS = 'preferredTheme';
const STYLES = [
  { name: 'Style 1', file: '1' },
  { name: 'Style 2', file: '2' },
  { name: 'Style 3', file: '3' },
  { name: 'Style 4', file: '4' },
  { name: 'Style 5', file: '5' },
  { name: 'Style 6', file: '6' },
  { name: 'Style 7', file: '7' },
];
const VERSIONS = [
  { name: 'English', file: 'index' },
  { name: 'Spanish', file: 'spanish' },
  { name: 'AST', file: 'ast' },
  { name: 'Tech Lead', file: 'leader' },
  { name: 'DevSecOps', file: 'devops' },
  { name: 'Fullstack', file: 'fullstack' },
  { name: 'Architect', file: 'architect' },
];

/**
 * Creates the switcher controls for style and version selection
 * Adds them to the DOM and sets up event listeners
 */
function createSwitchers() {
  const switchersDiv = document.createElement('div');
  switchersDiv.className = SWITCHER_CLASS_NAME;

  const styleSelect = document.createElement('select');
  styleSelect.id = STYLE_SELECT_ID;
  styleSelect.innerHTML = STYLES.map(
    style => `<option value="${style.file}">${style.name}</option>`,
  ).join('');

  const versionSelect = document.createElement('select');
  versionSelect.id = VERSION_SELECT_ID;
  versionSelect.innerHTML = VERSIONS.map(
    version => `<option value="${version.file}">${version.name}</option>`,
  ).join('');

  switchersDiv.appendChild(styleSelect);
  switchersDiv.appendChild(versionSelect);

  document.body.insertBefore(switchersDiv, document.body.firstChild);

  styleSelect.addEventListener('change', changeStyle);
  versionSelect.addEventListener('change', changeVersion);

  const currentPath = window.location.pathname;
  const currentStyle = document
    .getElementById(THEME_LINK_ID)
    .href.split('/')
    .pop();

  styleSelect.value = currentStyle || STYLES[0].file;
  versionSelect.value =
    currentPath.split('/').pop().split('.')[0] || VERSIONS[0].file;
}

/**
 * Changes the current theme style with a fade transition effect
 * @param {Event} event - The change event from the style selector
 */
function changeStyle(event) {
  document.body.classList.add('fadeOut');
  setTimeout(() => {
    const selectedStyle = event.target.value;
    localStorage.setItem(THEME_ITEM_LS, selectedStyle);
    document.getElementById(THEME_LINK_ID).href =
      `${BASE_PATH}style-${selectedStyle}.css`;
    document.body.classList.remove('fadeOut');
  }, 1500);
}

/**
 * Changes the current CV version by redirecting to the selected HTML file
 * @param {Event} event - The change event from the version selector
 */
function changeVersion(event) {
  const selectedVersion = event.target.value;
  window.location.href = `${selectedVersion}.html`;
}

/**
 * Initializes the page with saved theme preferences
 * Sets the correct selectors based on current URL and saved theme
 */
window.onload = function () {
  const savedTheme = localStorage.getItem(THEME_ITEM_LS);
  if (savedTheme) {
    document.getElementById(THEME_LINK_ID).href =
      `${BASE_PATH}style-${savedTheme}.css`;
    document.getElementById(STYLE_SELECT_ID).value = savedTheme;
  }
  document.getElementById(VERSION_SELECT_ID).value = window.location.pathname
    .split('/')
    .pop()
    .split('.')[0];
};

// Execute when DOM is ready
document.addEventListener('DOMContentLoaded', createSwitchers);
