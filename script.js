function toggleMenu(){
document.getElementById("sidebar").classList.toggle("active");
}

function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function generateLink(){
const file = document.getElementById("mainFile").files[0];

if(!file){
alert("اختر ملف");
return;
}

const url = URL.createObjectURL(file);

document.getElementById("result").innerHTML = `
<p>تم إنشاء رابط التحميل:</p>
<a class="download-link" href="${url}" download="${file.name}">تحميل مباشر</a>
`;
}

function openAdmin(){
const pass = prompt("ادخل كلمة السر");

if(pass === "AdminBlackVoid"){
showPage("adminPage");
}else{
alert("كلمة السر خاطئة");
}
}

function saveMod(){
const name = document.getElementById("modName").value;
const desc = document.getElementById("modDesc").value;
const file = document.getElementById("modFile").files[0];

if(!name || !desc || !file){
alert("اكمل جميع البيانات");
return;
}

const reader = new FileReader();

reader.onload = function(e){

const mods = JSON.parse(localStorage.getItem("blackvoid_mods") || "[]");

mods.push({
name:name,
desc:desc,
fileName:file.name,
fileData:e.target.result
});

localStorage.setItem("blackvoid_mods", JSON.stringify(mods));

loadMods();

alert("تم رفع المود بنجاح");
showPage("modsPage");
};

reader.readAsDataURL(file);
}

function loadMods(){

const container = document.getElementById("modsContainer");
container.innerHTML = "";

const mods = JSON.parse(localStorage.getItem("blackvoid_mods") || "[]");

if(mods.length === 0){
container.innerHTML = "<p>لا يوجد مودات حالياً</p>";
return;
}

mods.forEach(mod=>{

const card = document.createElement("div");
card.className = "mod-card";

card.innerHTML = `
<h3>${mod.name}</h3>
<p>${mod.desc}</p>
<br>
<a class="download-link" href="${mod.fileData}" download="${mod.fileName}">تحميل مباشر</a>
`;

container.appendChild(card);

});
}

loadMods();
