// input for searchbar to go here
const searchinput = document.getElementById("searchinput");
const displayoutput = document.getElementById("displayoutput");
searchinput.addEventListener("input" , (e) => {
displayoutput.innerText = e.target.value;

// api logic here

});

