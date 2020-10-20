const errors = {};
const util = require('util');

/**
* Used to create errors
* @Param {Number} httpCode - http response code
* @Param {String} message - Error message
* @Param {String} description - Error description
*/
function ApiError(httpCode, httpMessage, description) {
    this.httpCode = httpCode;
    this.httpMessage = httpMessage;
    this.description = description;
    this.details = null;
}

// Inherit the Error class
util.inherits(ApiError, Error);

// Exporting error Object
module.exports = errors;

errors.ApiError = ApiError;

ApiError.prototype.withDetails = function (details) {
    this.details = details;
    return this;
};

//--------------------- GENERIC ERRORS -------------------------/
errors.required_key = new ApiError(400, 'REQUIRED_KEY', 'Api key is required. Please provide a valid api key along with request.');
errors.required_auth = new ApiError(400, 'REQUIRED_AUTH_TOKEN', 'Auth Token is required. Please provide a valid auth token along with request.');
errors.internal_error = new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong on server. Please contact server admin.');
//errors.invalid_key = new ApiError(401, 'INVALID_KEY', 'Valid api key is required. Please provide a valid api key along with request.');
errors.invalid_auth = new ApiError(401, 'INVALID_AUTH', 'Valid auth token is required. Please provide a valid auth token along with request.');
errors.invalid_permission = new ApiError(401, 'INVALID_PERMISSION', 'Permission denied. Current user does not has required permissions for this resource.');
errors.invalid_access = new ApiError(401, 'INVALID_ACCESS', 'Access denied. Current user does not has access for this resource.');
errors.invalid_input = new ApiError(400, 'INVALID_INPUT', 'The request input is not as expected by API. Please provide valid input.');
errors.input_too_large = new ApiError(400, 'INPUT_TOO_LARGE', 'The request input size is larger than allowed.');
errors.invalid_input_format = new ApiError(400, 'INVALID_INPUT_FORMAT', 'The request input format is not allowed.');
errors.invalid_operation = new ApiError(403, 'INVALID_OPERATION', 'Requested operation is not allowed due to applied rules. Please refer to error details.');
errors.not_found = new ApiError(404, 'NOT_FOUND', 'The resource referenced by request does not exists.');
errors.not_registeration = new ApiError(404, 'NOT_REGISTERATION', 'User not registered with this email/mobile.');

//--------------- SOME OTHERS LOGIC ERRORS -------------------/
errors.invalid_key = new ApiError(403, 'INVALID_VERFICATION_KEY', 'Key is expired or does not exists.Please provide a valid verification key');
errors.could_not_get_access_token = new ApiError(403, 'INVALID_OPERATION', 'Error in getting access token');
errors.bad_request = new ApiError(403, 'INVALID_OPERATION', 'Bad Request');