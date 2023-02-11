function ObjectUtils() {
    this.isEmpty = function (object) {
        if (object === null || object === undefined || String(object).trim() === '') {
            return true;
        }
        return false;
    }
}