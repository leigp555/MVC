import $ from "jquery";
import "./app3.css"

const $square = $("#square")
$square.on("click",(e)=>{
    $square.toggleClass("active")
})