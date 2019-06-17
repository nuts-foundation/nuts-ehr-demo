/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /****************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {view: 'pages/homepage'},
  'get /login': 'UserController.view-login',
  'post /login': 'UserController.new-session',
  'get /user': 'UserController.welcome',
  'get /patients': 'PatientsController.list',
  'get /patients/:patientId': 'PatientsController.show',
  'get /patients/:patientId/external_care_providers': 'PatientsController.external-care-providers',
  'post /patients/:patientId/external_care_providers': 'PatientsController.external-care-providers',
  'post /patients/:patientId/record_consent': 'PatientsController.record-consent',


  /****************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};
