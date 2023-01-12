const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { error, success } = require("../utils/responseWrapper");
// after catch there cant be any next() function
// if it has try catch block only try block has the next() function

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
    // checking whether the web token i.e the access is made by us or not
    // accesstoken is getting verified and decoded
    const decodedVerifiedToken = jwt.verify(
      accesstoken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    // updating the request object by put id into it and passing the request in this middleware
    //  for the next middleware or the function or next controller

    req._id = decodedVerifiedToken._id; // gettig id from the decoded token
    req.email = decodedVerifiedToken.email; // geting the email from the decode token
    console.log("req.email", req.email);
    // req user also means that the user should be present inside the database also
    // not just being the valid access token ,
    // req user should be there unside the database also
    // doing a database call to check whether the user present inside the database or not
    const user = await Users.findById(req._id);
    if (!user) {
      return res.send(error(404, "user not found"));
    }

    next(); // next () goes to the next controller or middleware
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
  // after catch there cant be any next() function
  // if it has try catch block only try block has the next() function
};
module.exports = userRequire;
