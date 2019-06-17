module.exports = async function (req, res, proceed) {
  let contract = req.session.nuts_session;

  if (contract) {
    try {
      if (await sails.helpers.validateNutsSession(contract)) {
        return proceed();
      }
    } catch (err) {
    }
  }

  return res.unauthorized();

}

