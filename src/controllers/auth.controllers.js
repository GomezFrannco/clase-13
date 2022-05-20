export function getLogin(_req, res) {
  res.render("login", {});
}
export function postLogin(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/main')
  } else {
    res.redirect("/");
  }
}
export function getSignup(_req, res) {
  res.render("signup", {});
}
export function postSignup(req, res) {
  console.log(req.user);
  res.render("login", {});
}

export function failSignup(_req, res) {
  res.render("signup-error", {});
}
export function failLogin(_req, res) {
  res.render("login-error", {});
}

export function logout(req, res) {
  req.logout();
  res.redirect("/");
}

export function getMain(req, res) {
  const user = req.user
  res.render("login-ok", {usuario: user.userName});
}