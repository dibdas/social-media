export const KEY_ACCESS_TOKEN = "access_token_key";

// call this function to check whether you are login or logout
function gettingItemFromLocalStorage(key) {
  // function getItem(key) {
  // accessing the local storage of your website
  console.log(key);
  return localStorage.getItem(key);
}
// call this function after the login, to save the access token
// function settingItemFromLocalStorage(key, value) {
export function setItem(key, value) {
  localStorage.setItem(key, value);
  console.log(key);
  console.log(value);
}
// call this function while logout
function removingItemFromLocalStorage(key) {
  // function removeItem(key) {
  return localStorage.removeItem(key);
}

export {
  gettingItemFromLocalStorage,
  // settingItemFromLocalStorage,
  removingItemFromLocalStorage,
  //   getItem,
  // setItem,
  //   removeItem,
};
