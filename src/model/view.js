import EventBus from "../eventBus/eventBus";

class View extends EventBus{
    constructor(option) {
        super()
        Object.assign(this, option)
        this.render(this.data.n)
        this.autoBindEvents()
        this.on("m:updated", () => {
            this.render(this.data.n)
        })

    }
    autoBindEvents() {
        for (let key in this.events) {
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1,)
            const value = this.method[this.events[key]]
            this.el.on(part1, part2, value)
        }
    }
}


export default View