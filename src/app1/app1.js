import "./app1.css"
import $ from "jquery"
import Model from "../model/model.js";

const eventBus = $({})


const m = new Model({
    data: {
        n: parseInt(localStorage.getItem("n")) || 100
    },
    updated(data) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem("n", JSON.stringify(m.data.n))
    }
})
//其他 C
const View = {
    el: null,
    html: `
    <div id="app1">
        <div id="init">{data}</div>
        <button id="reset">重置</button>
        <button id="buttonA">+1</button>
        <button id="buttonB">-1</button>
        <button id="buttonC">×2</button>
        <button id="buttonD">÷2</button>
    </div>`,
    init(container) {
        View.el = $(container)
        View.render(m.data.n)
        View.autoBindEvents()
        eventBus.on("m:updated", () => {
            View.render(m.data.n)
        })
    },
    render(n) {
        if (View.el.children().length !== 0) View.el.empty()
        $(View.html.replace("{data}", JSON.stringify(n))).appendTo(View.el)
    },
    events: {
        'click #buttonA': 'add',
        'click #buttonB': 'minus',
        'click #buttonC': 'mul',
        'click #buttonD': 'div',
        'click #reset': 'reset',

    },
    add() {
        m.updated({n: m.data.n + 1})
    },
    minus() {
        m.updated({n: m.data.n - 1})
    },
    mul() {
        m.updated({n: m.data.n * 2})
    },
    div() {
        m.updated({n: m.data.n / 2})
    },
    reset() {
        m.updated({n: 100})
    },
    autoBindEvents() {
        for (let key in View.events) {
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1,)
            const value = View[View.events[key]]
            View.el.on(part1, part2, value)
        }
    }
}

export default View



