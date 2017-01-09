/**
 * Middleware for all routes
 */
'use strict';

module.exports = {
	requiredParams: (req, res, requiredParams) => {
		for (const param of requiredParams) {
      if (!req.params[param]) {
        res.send(409, {
          title: "Missing parameter: " + param
        });
      }
    }
	}
}