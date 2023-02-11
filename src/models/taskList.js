function TaskList() {
    this.arr = []
    this.addTask = function (task) {
        if (objectUtils.isEmpty(task)) {
            return todoResponse.buildResponse(true, "Cannot add task", null, 400);
        }

        // Add task
        this.arr.push(task)

        // Return
        return todoResponse.buildSuccessResponse("Add task successfully", task);
    }

    this.getAll = function () {
        return this.arr;
    }

    this.deleteById = function (taskId) {

    }

    this.findById = function (taskId) {

    }

    this.findIndexById = function (taskId) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === taskId) {
                index = i;
                break;
            }
        }

        return index;
    }

    this.findByName = function (nameTask) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].name === nameTask) {
                index = i;
                break;
            }
        }

        return index;
    }

    this.update = function (task) { }
}