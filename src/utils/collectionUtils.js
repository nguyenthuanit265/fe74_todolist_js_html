function CollectionUtils() {
    this.isEmpty = function (objects) {
        if (objects === null || objects === undefined || objects.length === 0) {
            return true;
        }
        return false;
    }

    this.isAnyEmpty = function(objects) {
        if (!this.isEmpty(objects)) {
            objects.forEach(object => {
                if (objectUtils.isEmpty(object)) {
                    return true;
                }
            })
        }

        return false;
    }
}