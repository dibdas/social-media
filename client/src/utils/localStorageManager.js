const KEY_ACCESS_TOKEN = "access_token";

// call this function to check whether you are login or logout
function gettingItemFromLocalStorage(key) {
  // function getItem(key) {
  // accessing the local storage of your website
  return localStorage.getItem(key);
}
// call this function after the login, to save the access token
function settingItemFromLocalStorage(key, value) {
  // function setItem(key, value) {
  return localStorage.setItem(key, value);
}
// call this function while logout
function removingItemFromLocalStorage(key) {
  // function removeItem(key) {
  return localStorage.removeItem(key);
}

export {
  gettingItemFromLocalStorage,
  settingItemFromLocalStorage,
  removingItemFromLocalStorage,
  //   getItem,
  //   setItem,
  //   removeItem,
  KEY_ACCESS_TOKEN,
};
