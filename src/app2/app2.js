import "./app2.css"
import $ from "jquery"
import View from "../model/view";
const init=(el)=>{
    const view=new View({
        el: $(el),
        data: {
            n: parseInt(localStorage.getItem("m:index")) || 0
        },

        updated(data, y) {
            Object.assign(this.data, data)
            this.trigger("m:updated")
            localStorage.setItem("m:index", y)
        },
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
        render(index) {
            index = parseInt(index)
            if (this.el.children().length !== 0) this.el.empty()
            $(this.html(index)).appendTo(this.el)
        },
        events: {
            'click #content li': 'selected'
        },
        method:{
            selected(e) {
                let index = e.currentTarget.dataset.index
                view.updated({n: index}, index)


            },
        },

    })
}

export default init
