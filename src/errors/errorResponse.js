module.exports = {
    errorResponse: function ({ httpCode = 500, httpMessage = '', description = '', details = '' }) {
        this.HTTP_STATUS = httpCode;
        this.MESSAGE = httpMessage;
        this.DESCRIPTION = description;
        this.DETAILS = details;
    }
};

