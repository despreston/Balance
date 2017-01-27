/**
 * Middleware for all routes
 */
'use strict';

module.exports = {
	requiredParams: (params, res, requiredParams) => {
		for (const param of requiredParams) {
      if (!params[param]) {
        res.send(409, {
          title: "Missing parameter: " + param
        });
      }
    }
	}
}