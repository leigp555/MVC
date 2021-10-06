import "./app2.css"
import $ from "jquery"
import Model from "../model/model.js";
import View from "../model/view";

const eventBus = $({})

//数据相关 M
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem("m:index")) || 0
    },
    updated(data, y) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem("m:index", y)
    },
})



//其他 C
const c = {
    v:null,
    container:null,
    initV(){
        c.v=new View({
            el: c.container,
            html: (index) => {
                return `
     <section id="app2">
        <ol id="content">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0">contentA</li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1">contentB</li>
        </ol>
        <ol id="table">
            <li class="${index === 0 ? 'active' : ''}">内容一</li>
            <li class="${index === 1 ? 'active' : ''}">内容二</li>
        </ol>
    </section>`
            },
            init(container) {
                c.v.el = $(container)
            },
            render(index) {
                index = parseInt(index)
                if (c.v.el.children().length !== 0) c.v.el.empty()
                $(c.v.html(index)).appendTo(c.v.el)
            }
        })
        c.v.init(c.container)
        c.v.render(m.data.index)
    },
    init(container) {
        c.container=container
        c.initV()
        c.autoBindEvents()
        eventBus.on("m:updated", () => {
            c.v.render(m.data.index)
        })
    },
    events: {
        'click #content li': 'selected'
    },
    selected(e) {
        let index = e.currentTarget.dataset.index
        m.updated({index: index}, index)
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
