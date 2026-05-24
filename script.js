
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

const reader = new FileReader();

reader.onload = function(e){

const id = "file_" + Math.random().toString(36).substring(2,10);

const pageData = {
name:file.name,
data:e.target.result
};

localStorage.setItem(id, JSON.stringify(pageData));

const pageLink = window.location.origin + window.location.pathname + "?download=" + id;

document.getElementById("result").innerHTML = `
<p>تم إنشاء صفحة تحميل خاصة:</p>
<a class="download-link" target="_blank" href="${pageLink}">فتح صفحة التحميل</a>
`;
};

reader.readAsDataURL(file);
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

function checkDownloadPage(){

const params = new URLSearchParams(window.location.search);
const downloadId = params.get("download");

if(downloadId){

const data = JSON.parse(localStorage.getItem(downloadId));

if(!data){
document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:100px'>الرابط غير صالح</h1>";
return;
}

document.body.innerHTML = `
<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#050505;font-family:Arial">
<div style="background:#111;padding:40px;border-radius:20px;text-align:center;border:1px solid #00ff99;max-width:500px;width:90%">
<h1 style="color:#00ff99;margin-bottom:20px">BLACK VOID</h1>
<p style="color:white;margin-bottom:25px">${data.name}</p>
<a href="${data.data}" download="${data.name}" 
style="display:inline-block;padding:16px 24px;background:#00ff99;color:black;text-decoration:none;border-radius:12px;font-weight:bold;font-size:18px">
تحميل مباشر
</a>
</div>
</div>
`;
}
}

checkDownloadPage();
loadMods();
