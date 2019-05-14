const validateEmail = function (email) {
  var re = /^[a-z0-9\.\-\_]+\@[a-z0-9\-\_]+(\.[a-z0-9\-\_]+){1,4}$/;
  return re.test(email.toLowerCase());
}
