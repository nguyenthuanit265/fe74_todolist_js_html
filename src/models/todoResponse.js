function TodoResponse() {
    this.data = ''
    this.code = ''
    this.message = ''
    this.isError = ''

    this.buildResponse = function (isError, message, data, code) {
        this.data = data
        this.code = code
        this.message = message
        this.isError = isError

        return this;
    }

    this.buildSuccessResponse = function (message, data) {
        this.data = data
        this.code = 200
        this.message = message
        this.isError = false

        return this;
    }
}