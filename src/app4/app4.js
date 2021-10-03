import "./app4.css";
import $ from "jquery"
const $change=$("#change")
$change.on("mouseenter",()=>{
    $change.addClass("active")
}).on("mouseleave",()=>{
    $change.removeClass("active")
})