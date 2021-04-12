function submitForm(){
    const LineHashID = location.href.split("=")[1];
    const form = document.getElementById("studentForm");
    const inputLineHashID = document.createElement("input");

    inputLineHashID.setAttribute("name", "LineHashID");
    inputLineHashID.setAttribute("value", LineHashID);
    inputLineHashID.setAttribute("type", "hidden");
    form.appendChild(inputLineHashID)
}