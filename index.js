"use strict"

// ---------------------- Variables ----------------------------------------------------

const regions = $('#regions');
const dataa = $('#date');
const time = $('#time');
const mintaqa = $('#mintaqa');
const region_btn = $('#region-wrapper');
const region_ul =$('#region-ul');
const region_title = $('#region-title');
const touch_close = $("#touch-close");
const baseURL = "https://islomapi.uz/api/present/day?region=Toshkent"
const cards = $$('.timedata');
let OpenClose = false;



const provencie = [
    "Toshkent",
    "Farg'ona",
    "Samarqand",
    "Xorazm",
    "Navoiy",
    "Qashqadaryo",
    "Surxondaryo",
    "Andijon",
    "Namangan",
    "Jizzax",
    "Buxoro",
    "Sirdaryo",
 ];




// -------------------------- Functions --------------------------------
function drowdownOpen(){
    region_ul.innerHTML = '';
    provencie.forEach(el => {
        const list = createElement("li", '', el);
        list.setAttribute('data-info', el);
        region_ul.appendChild(list);
    })
    regions.style.cssText = "display: block; transition: all 0.2s linear; opacity: 1; top:50px";
}

function drowdownClose(){
    regions.style.cssText = "display: none; transition: all 0.5s linear; opacity: 0; top:150px";
}


function timereload(){
    let soat = new Date().getHours();
    let minut = new Date().getMinutes();
    let sec = new Date().getSeconds();
    time.innerHTML = `${soat}:${minut}:${sec}`;

    let yil = new Date().getFullYear();
    let ay = new Date().getDate();
    let oy = new Date().getMonth()+1;
    dataa.innerHTML = `${ay}.${oy}.${yil}-yil`



}

setInterval(timereload, 1000)


function renderTime(data){
    let arr = []
    data.forEach((el, i) => {
        arr.push([el[1].split(':')]);
        cards[i].innerHTML = el[1]
    });
    

    let soat = new Date().getHours();
    let minut = new Date().getMinutes();
    let minutlar = soat * 60 + minut;
    
    arr.forEach((el, i) => {
        let sonlar = 0
        sonlar = (+el[0][0] * 60) + +el[0][1];
        if(sonlar - minutlar > 0){
            cards[i].style.cssText = "background-color: rgb(255, 255, 255);";
            
        }else{
            cards[i].style.cssText = "background-color: rgb(240, 240, 240);";
        }
    });

}


// ---------------------- Event listeners ----------------------------------------------------
region_btn.addEventListener('click', () => {
    if(OpenClose == false){
        OpenClose = true;
        drowdownOpen();
    }else{
        OpenClose = false;
        drowdownClose();
    }
});

region_btn.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-info')){
        let id = e.target.getAttribute('data-info');
        region_title.innerHTML = id;
        mintaqa.innerHTML = id + " viloyati";
        drowdownClose();
    }
})

window.addEventListener('click', (e) => {
    if(e.target.parentNode.getAttribute('id') != 'touch-close' && e.target.parentNode.getAttribute('id') != "region-wrapper" && OpenClose == true){
       drowdownClose();
       OpenClose = false;
    }
})



// ----------------------- GET URL --------------------

async function gettURL(){
    const respons =await fetch(baseURL);
    const data = await respons.json();
    let datas = Object.entries(data.times);
    renderTime(datas);
}
gettURL();

