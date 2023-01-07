const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const userRequire = async (req, res, next) => {
  console.log(`I am inside middleware `);
  //   if the next function was not written, then  it would not have move to the getAllPostsController
  //   checking whether request has headers or not,
  //   if it has headers check whether headers has   authorization string or not
  // if it has check whether authorization string starts with Bearer or not
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    // {
    //   return res
    //     .status(401)
    //     .json({ message: `you are not authorized to access this` });
    // }
    return res.send(
      error(401, {
        message: `authorization header is required, you are not authorized to access this`,
      })
    );
  }
  //   authorization.split(" ") split 'Bearer' and token in two halves and split(" ") as there is space
  //   between Bearer and token

  const accesstoken = req.headers.authorization.split(" ")[1];
  console.log(`access token inside middleware userRequire`, accesstoken);
  //   decode will the token and let you know the stuffs inside the token
  try {
    // verifying the access token whether it is valid or invalid
    const verifiedToken = jwt.verify(
      accesstoken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    // updating the request object by put id into it and passing the request in this middleware
    //  for the next middleware or the function or next controller
    req._id = verifiedToken._id;
    req.email = verifiedToken.email;
    next();
    // if the key got expired or it is the invalid key then that will throw the error

    //  as error from try  catch block and the function error is contradicting,
    //  therefore making the error from try catch block as  err
  } catch (err) {
    console.log(err);
    // access token got expired
    // return res.status(401).json({ message: `Invalid access key` });
    return res.send(
      error(401, { message: `Acces token got expired so Invalid access Key` })
    );
  }
  next();
};
module.exports = userRequire;
