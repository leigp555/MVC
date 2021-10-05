import "./app1.css"
import $ from "jquery"
import Model from "../model/model.js";
import View from "../model/view";

const eventBus = $({})

//数据相关
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
// 方法一
// m.updated=(data)=>{
//     Object.assign(m.data, data)
//     eventBus.trigger("m:updated")
//     localStorage.setItem("n", JSON.stringify(m.data.n))
// }


//视图相关 V
// const v = {
//     el: null,
//     html: `
//     <div id="app1">
//         <div id="init">{data}</div>
//         <button id="reset">重置</button>
//         <button id="buttonA">+1</button>
//         <button id="buttonB">-1</button>
//         <button id="buttonC">×2</button>
//         <button id="buttonD">÷2</button>
//     </div>`,
//     init(container) {
//         v.el = $(container)
//     },
//     render(n) {
//         if (v.el.children().length !== 0) v.el.empty()
//         $(v.html.replace("{data}", JSON.stringify(n))).appendTo(v.el)
//     }
// }
//其他 C
const c = {
    v: null,
    container: null,
    initV() {
        c.v = new View({
            el: c.container,
            html: `
    <div id="app1">
        <div id="init">{data}</div>
        <button id="reset">重置</button>
        <button id="buttonA">+1</button>
        <button id="buttonB">-1</button>
        <button id="buttonC">×2</button>
        <button id="buttonD">÷2</button>
    </div>`,
            render: function (n) {
                if (c.v.el.children().length !== 0) c.v.el.empty()
                $(c.v.html.replace("{data}", JSON.stringify(n))).appendTo(c.v.el)
            },
            init() {
                c.v.el = $(c.container)
            }
        })
        c.v.init()
        c.v.render(m.data.n)
    },
    init(container) {
        c.container = container
        c.initV()
        c.autoBindEvents()
        eventBus.on("m:updated", () => {
            c.v.render(m.data.n)
        })
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
        for (let key in c.events) {
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1,)
            const value = c[c.events[key]]
            c.v.el.on(part1, part2, value)
        }
    }
}

export default c



