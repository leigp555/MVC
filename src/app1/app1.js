import "./app1.css"
import $ from "jquery"
import View from "../model/view";

const eventBus = $({})
const init = (el) => {
    const view = new View({
        eventBus: eventBus,
        el: $(el),
        data: {
            n: parseFloat(localStorage.getItem("n")) || 100
        },
        updated(data) {
            Object.assign(this.data, data)
            this.eventBus.trigger("m:updated")
            localStorage.setItem("n", JSON.stringify(this.data.n))
        },
        html: `
    <div id="app1">
        <div id="init">{data}</div>
        <button id="reset">重置</button>
        <button id="buttonA">+1</button>
        <button id="buttonB">-1</button>
        <button id="buttonC">×2</button>
        <button id="buttonD">÷2</button>
    </div>`,
        render(n) {
            $(`<span>hello<span>`).appendTo(this.el)

            if (this.el.children().length !== 0) this.el.empty()
            $(this.html.replace("{data}", JSON.stringify(n))).appendTo(this.el)
        },
        events: {
            'click #buttonA': 'add',
            'click #buttonB': 'minus',
            'click #buttonC': 'mul',
            'click #buttonD': 'div',
            'click #reset': 'reset',

        },
        method: {
            add() {
                view.updated({n: view.data.n + 1})
            },
            minus() {
                view.updated({n: view.data.n - 1})
            },
            mul() {
                view.updated({n: view.data.n * 2})
            },
            div() {
                view.updated({n: view.data.n / 2})
            },
            reset() {
                view.updated({n: 100})
            }
        },
    })

}


export default init



