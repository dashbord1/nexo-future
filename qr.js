const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
coptBtn = wrapper.querySelector(".copy"),
closetBtn = wrapper.querySelector(".close");



function fetchRequest(formData , file){
    infoText.innerText = "scanning QR Code ...";
    fetch("https://api.qrserver.com/v1/read-qr-code/?",{
        method: "POST" , body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "upload ticket to scan!": "couldn,t scan Qr code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        // form.querySelector("icon-icon").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
        console.log(result);
    }).catch(() => {
        infoText.innerText = "couldn,t scan Qr code";
    })
}



fileInp.addEventListener("change", e=>{
    let file = e.target.files[0]; // getting user selected file
    if(!file) return;
    let formData = new FormData(); //creating a new form data
    formData.append("file", file); // adding file to data
    fetchRequest(formData,file);
});

coptBtn.addEventListener("click" , () =>{
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})
form.addEventListener("click", () => fileInp.click());
closetBtn.addEventListener("click", () => wrapper.classList.remove("active"));