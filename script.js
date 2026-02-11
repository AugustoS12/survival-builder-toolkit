const clickSound = new Audio("sounds/click.mp3");

function playClick(){
if(clickSound) clickSound.play();
}

function mostrarTab(id){
document.querySelectorAll(".section").forEach(s=>s.style.display="none");
document.getElementById(id).style.display="block";
}
mostrarTab("circle");

function calcularStorageInterno(b){
const stacks=Math.floor(b/64);
const sobrante=b%64;
const shulkers=Math.floor(stacks/27);
const restoStacks=stacks%27;
const cofres=Math.floor(stacks/54);

return `
Bloques: ${b}<br>
Stacks: ${stacks} + ${sobrante}<br>
Shulkers: ${shulkers} + ${restoStacks} stacks<br>
Dobles Cofres: ${cofres}
`;
}

function dibujarCirculo(){
const d=parseInt(circleDiameter.value);
const g=parseInt(circleThickness.value);
const modo=circleMode.value;
const frac=circleFraction.value;

const ctx=circleCanvas.getContext("2d");
ctx.clearRect(0,0,500,500);

const r=d/2;
const esc=500/d;
let bloques=0;

for(let x=0;x<d;x++){
for(let y=0;y<d;y++){

if(frac==="half" && y<r) continue;
if(frac==="quarter" && (x<r||y<r)) continue;

const dx=x-r+0.5;
const dy=y-r+0.5;
const dist=Math.sqrt(dx*dx+dy*dy);

if(modo==="solid" && dist<=r){
ctx.fillStyle="#55ff55";
ctx.fillRect(x*esc,y*esc,esc-1,esc-1);
bloques++;
}

if(modo==="hollow" && dist<=r && dist>=r-g){
ctx.fillStyle="#55ff55";
ctx.fillRect(x*esc,y*esc,esc-1,esc-1);
bloques++;
}
}
}

circleInfo.innerHTML=calcularStorageInterno(bloques);
}

function calcularEsfera(){
const d=parseInt(sphereDiameter.value);
const g=parseInt(sphereThickness.value);
const modo=sphereMode.value;
const frac=sphereFraction.value;

const r=d/2;
let bloques=0;

for(let x=0;x<d;x++){
for(let y=0;y<d;y++){
for(let z=0;z<d;z++){

if(frac==="half" && y<r) continue;
if(frac==="quarter" && (x<r||y<r||z<r)) continue;

const dx=x-r;
const dy=y-r;
const dz=z-r;
const dist=Math.sqrt(dx*dx+dy*dy+dz*dz);

if(modo==="solid" && dist<=r) bloques++;
if(modo==="hollow" && dist<=r && dist>=r-g) bloques++;
}
}
}

sphereInfo.innerHTML=calcularStorageInterno(bloques);
}

function dibujarCapaEsfera(){
const d=parseInt(sphereDiameter.value);
const layer=parseInt(sphereLayer.value);
const r=d/2;

const ctx=sphereCanvas.getContext("2d");
ctx.clearRect(0,0,500,500);

const esc=500/d;
let bloques=0;

for(let x=0;x<d;x++){
for(let z=0;z<d;z++){

const dx=x-r+0.5;
const dy=layer-r+0.5;
const dz=z-r+0.5;

if(dx*dx+dy*dy+dz*dz<=r*r){
ctx.fillStyle="#55ff55";
ctx.fillRect(x*esc,z*esc,esc-1,esc-1);
bloques++;
}
}
}

sphereInfo.innerHTML="Bloques en capa: "+bloques;
}

function calcularBeacon(){
const level=parseInt(beaconLevel.value);
let bloques=0;
for(let i=1;i<=level;i++){
bloques+=Math.pow((2*i+1),2);
}
beaconResult.innerHTML=calcularStorageInterno(bloques);
}

function calcularStorage(){
const total=parseInt(totalBlocksInput.value);
storageResult.innerHTML=calcularStorageInterno(total);
}

function exportarCanvas(id){
const canvas=document.getElementById(id);
const link=document.createElement("a");
link.download="blueprint.png";
link.href=canvas.toDataURL();
link.click();
}

function guardarProyecto(){
let proyectos=JSON.parse(localStorage.getItem("proyectos")) || [];

const nuevo={
nombre:prompt("Nombre del proyecto:"),
diametro:circleDiameter.value,
grosor:circleThickness.value,
modo:circleMode.value,
frac:circleFraction.value
};

proyectos.push(nuevo);
localStorage.setItem("proyectos",JSON.stringify(proyectos));
alert("Proyecto guardado");
}

function exportarProyectoJSON(){
const data=localStorage.getItem("proyectos");
const blob=new Blob([data],{type:"application/json"});
const link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="proyectos.json";
link.click();
}

if('serviceWorker' in navigator){
navigator.serviceWorker.register("service-worker.js");
}
