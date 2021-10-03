import "./app2.css"
import $ from "jquery"

const $content = $("#content")
const $table = $("#table")
$content.on("click", "li", (e) => {
    const $li = $(e.currentTarget)
    $li.addClass("selected").siblings().removeClass("selected")
    const index = $li.index()
    $table.children().eq(index).addClass("active").siblings().removeClass("active")
})
$content.children().eq(0).trigger("click")