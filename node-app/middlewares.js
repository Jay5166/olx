const authPage = (permissions) => {
    return (req, res, next) => {
      const userRole = req.body.userRole;
      if (permissions.includes(userRole)) {
        next();
      } else {
        return res.send({ message: 'Product Not Liked' });
      }
    };
  };
  
  module.exports = authPage;
  