const nav=document.getElementById("nav"),hamb=document.getElementById("hamb"),topBtn=document.getElementById("top");
const projectModals=document.querySelectorAll(".project-modal");
const projectDetailTriggers=document.querySelectorAll(".project-detail-trigger");
const closeProjectModal=modal=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")};
projectDetailTriggers.forEach(trigger=>trigger.addEventListener("click",event=>{event.preventDefault();const modal=document.querySelector(trigger.getAttribute("href"));modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");modal.querySelector(".project-modal-close").focus()}));
projectModals.forEach(modal=>modal.querySelectorAll("[data-close-project]").forEach(button=>button.addEventListener("click",()=>closeProjectModal(modal))));
document.addEventListener("keydown",event=>projectModals.forEach(modal=>{if(event.key==="Escape"&&modal.classList.contains("is-open"))closeProjectModal(modal)}));
const revealItems=document.querySelectorAll(".about-section,.skills-section,.projects-section,.experience-section,.skill,.projects article,.about-card,.contact,.timeline>div");
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});
revealItems.forEach(item=>{item.classList.add("reveal");revealObserver.observe(item)});
const helloText=document.querySelector(".pill");
if(helloText){
 const fullText="Hello, I'm"; let textIndex=0; let deleting=false;
 helloText.textContent="";
 const typeHello=()=>{
  helloText.textContent=fullText.slice(0,textIndex);
    if(!deleting&&textIndex<fullText.length){textIndex++;setTimeout(typeHello,500)}
  else if(!deleting){deleting=true;setTimeout(typeHello,5000)}
    else if(textIndex>0){textIndex--;setTimeout(typeHello,500)}
    else{deleting=false;setTimeout(typeHello,3000)}
 };
 typeHello();
}
hamb.onclick=()=>{nav.classList.toggle("open");hamb.textContent=nav.classList.contains("open")?"×":"☰"};
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));
window.addEventListener("scroll",()=>{
 topBtn.classList.toggle("show",scrollY>400);
 let current="home";
 document.querySelectorAll("section[id]").forEach(s=>{if(scrollY>=s.offsetTop-120)current=s.id});
 document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});
const contactForm=document.getElementById("form");
const contactMessage=document.getElementById("msg");
contactForm.addEventListener("submit",async event=>{
 event.preventDefault();
 const submitButton=contactForm.querySelector('button[type="submit"]');
 submitButton.disabled=true;
 contactMessage.textContent="Mengirim pesan...";
 contactMessage.dataset.state="sending";
 try{
  const response=await fetch(contactForm.action,{method:"POST",body:new FormData(contactForm),headers:{Accept:"application/json"}});
  const result=await response.json();
  if(!response.ok||(result.success!=="true"&&result.success!==true)){
   throw new Error(result.message||"Pesan belum berhasil dikirim.");
  }
  contactMessage.textContent="Terima kasih! Pesan kamu berhasil dikirim.";
  contactMessage.dataset.state="success";
  contactForm.reset();
 }catch(error){
  console.error("Pengiriman formulir kontak gagal:",error);
  contactMessage.textContent="Pesan gagal dikirim. Silakan coba lagi atau hubungi saya melalui email.";
  contactMessage.dataset.state="error";
 }finally{
  submitButton.disabled=false;
 }
});
