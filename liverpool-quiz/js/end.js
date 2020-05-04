const score = localStorage.getItem("score");
const max = localStorage.getItem("max");
let scoreField = document.getElementsByClassName("score");
scoreField[0].innerText = `${score} of ${max}`;

// localStorage.removeItem("score");
