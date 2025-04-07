  function isLogIn(req, res, next) {
    console.log(req.user);
    if (req.cookies["token"] == " " || req.cookies.token == undefined)
      res.redirect("/login");
    else {
      jwt.verify(req.cookies["token"], "shccccccccccc", function (err, decoded) {
        req.user = decoded;
      });
    }
    next();
  }

  export default islogin;