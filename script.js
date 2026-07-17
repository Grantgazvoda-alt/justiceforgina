const button=document.querySelector('.menu-button');
const nav=document.querySelector('.primary-nav');

if(button&&nav){
  button.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
  });

  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    button.setAttribute('aria-expanded','false');
  }));
}

const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach(item=>observer.observe(item));
}else{
  items.forEach(item=>item.classList.add('visible'));
}

const pressCard=[...document.querySelectorAll('.media-cards article')].find(card=>card.querySelector('span')?.textContent.trim()==='PRESS');
if(pressCard&&!pressCard.querySelector('.press-contact')){
  const contact=document.createElement('div');
  contact.className='press-contact';
  contact.innerHTML=`
    <hr>
    <h4>Press Contact</h4>
    <p><strong>Garrison Gazvoda</strong><br>Son of Gina Gazvoda</p>
    <p><a href="tel:+12036951721" aria-label="Call Garrison Gazvoda at 203-695-1721">203-695-1721</a><br><a href="mailto:GarrisonGazvoda3@gmail.com">GarrisonGazvoda3@gmail.com</a></p>
  `;
  pressCard.appendChild(contact);
}

const year=document.getElementById('year');
if(year) year.textContent=String(new Date().getFullYear());
