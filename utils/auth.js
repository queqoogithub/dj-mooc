import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    //const token = authorization.slice(7, authorization.length);
    const token = authorization.split(' ')[1]
    //console.log('token1=>', authorization)
    //console.log('token2=>', process.env.JWT_SECRET)
    //console.log('Req @ isAuth ======================> ', req)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => { 
      if (err) {
        console.log(err)
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        console.log('decodeeeeeeeeeeeee ============> ', decode)
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
const isAdmin = async (req, res, next) => {
  //console.log('Req ======================> ', req)
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'User is not admin' });
  }
};

export { signToken, isAuth, isAdmin };