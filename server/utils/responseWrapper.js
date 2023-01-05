// send the data to the frontend in the new format
const success = (statusCode, result) => {
  return {
    status: `ok`,
    statusCode,
    result,
  };
};
const error = (statusCode, message) => {
  return {
    status: `error`,
    statusCode,
    message,
  };
};
module.exports = { success, error };
