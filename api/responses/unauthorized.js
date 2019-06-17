module.exports = function unauthorized() {

  let res = this.res;

  return res.redirect('/login');
}
