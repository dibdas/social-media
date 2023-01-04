const getAllPostsController = async (req, res) => {
  console.log(req._id);
  return res.json({ text: `these are all the routes` });
};
module.exports = { getAllPostsController };
