import $ from "jquery";
import "./app3.css"
const html = ` <section id="app3">
        <div id="square"></div>
    </section>`
const $html = $(html)
$html.appendTo($("#function"))
const $square = $("#square")
let key="app3_has"
let n= localStorage.getItem(key)==="yes"
$square.toggleClass("active",n)

$square.on("click", (e) => {
   if($square.hasClass("active")){
       $square.removeClass("active")
       localStorage.setItem(key,"no")
   }else{
       $square.addClass("active")
       localStorage.setItem(key,"yes")
   }
})