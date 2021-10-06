import EventBus from "../eventBus/eventBus";

class Model extends EventBus{
    constructor(option) {
        super()
         const array=["data", "add", "delete", "updated", "look"]
        array.forEach((key) => {
            if (key in option) {
                this[key] = option[key]
            }
        },
            this.data=option.data
        )}

    delete() {
        // console && console.error&&console.log("还没有创建")
        console?.error?.("还没有创建");
    }

    add() {
        console?.error?.("还没有创建");
    }

    look() {
        console?.error?.("还没有创建");
    }

    updated() {
        console?.error?.("还没有创建");
    }
}

export default Model