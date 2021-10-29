/*
fetch("https://sozluk.gov.tr/atasozu")
    .then(response => response.json())
    .then(json => console.log(json));
    */

const output = document.getElementById("output");
const searchBox = document.getElementById("searchBox");
const searchList = document.getElementById("searchList");


//json kaynagından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturalım

const switchWord = [];
const idiomsSays = [];

//async function  
//giriş için verilere ulaşma
loadData();

async function loadData() {
    const comeDatas = await fetch("https://sozluk.gov.tr/atasozu");
    let datas = await comeDatas.json();


    datas.forEach(element => {
        switchWord.push(element.anahtar);
        idiomsSays.push(element.sozum);

    });
    const unitedWord = [...new Set(switchWord)]; //burası anahtar kelimelerdeki tekrarları teke indirmek için
    unitedWord.sort(() => Math.random() - 0.5);
    let sayac = 0;
    unitedWord.forEach(element => {
        if (sayac < 5) {
            const newSwitchWord = document.createElement("option");
            searchList.appendChild(newSwitchWord);
            newSwitchWord.value = element;
        }
        sayac++;


        //searchList.innerHTML = `<option>${element}</option>`;
    });
}

searchBox.addEventListener("input", (e) => {
    sonuclariFiltrle(e.target.value);
})

const sonuclariFiltrle = (wantedWord) => {
    output.innerHTML = "";
    const wantedKey = new RegExp(wantedWord, "gi") //büyük küçük duyarsız
    let equals = idiomsSays.filter(word => wantedKey.test(word));

    if (wantedWord.length < 1) {
        equals = []
    } else {
        equals.forEach(es => {
            const otherOutput = document.createElement("li");
            output.appendChild(otherOutput);
            otherOutput.innerHTML = es;
            //output.innerHTML = `<li>${es}</li>`;
        })
    }

}