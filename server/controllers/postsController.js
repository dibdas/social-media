const { error, success } = require("../utils/responseWrapper");

const getAllPostsController = async (req, res) => {
  console.log(req._id);
  // return res.json({ text: `these are all the routes` });
  return res.send(success(200, { message: `these are all the routes` }));
};
module.exports = { getAllPostsController };
