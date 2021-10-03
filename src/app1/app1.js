import "./app1.css"
import $ from "jquery"
let n=localStorage.getItem("n"||100)
const $text = $("#init").text(n)
const $reset = $("#reset")
const $buttonA = $("#buttonA")
const $buttonB = $("#buttonB")
const $buttonC = $("#buttonC")
const $buttonD = $("#buttonD")

let number = parseInt($text.text());
$buttonA.on("click", () => {
    number = number +1
    let string = JSON.stringify(number)
    $("#init").text(string)
    localStorage.setItem("n", string)
})
$buttonB.on("click", () => {
    number = number -1
    let string = JSON.stringify(number)
    $("#init").text(string)
    localStorage.setItem("n", string)
})
$buttonC.on("click", () => {
    number = number *2
    let string = JSON.stringify(number)
    $("#init").text(string)
    localStorage.setItem("n", string)
})
$buttonD.on("click", () => {
    number = number /2
    let string = JSON.stringify(number)
    $("#init").text(string)
    localStorage.setItem("n", string)
})
$reset.on("click", () => {
    number = 100
    let string = JSON.stringify(number)
    $("#init").text(string)
    localStorage.setItem("n", string)
})