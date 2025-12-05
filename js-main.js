// Minimal JS: navigation toggle, carousel, forms -> open WhatsApp with prefilled message
document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle for small screens
  function setupNav(toggleId, navId) {
    const t = document.getElementById(toggleId);
    const nav = document.getElementById(navId || 'nav');
    if(t && nav){
      t.addEventListener('click', ()=> {
        const expanded = t.getAttribute('aria-expanded') === 'true';
        t.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
      });
    }
  }
  setupNav('navToggle','nav');
  setupNav('navToggle2','nav2');

  // Carousel
  const carousel = document.querySelector('.carousel');
  if(carousel){
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    let i = 0;
    function show(n){
      slides.forEach((s, idx)=> s.classList.toggle('active', idx === n));
    }
    show(i);
    setInterval(()=> { i = (i+1) % slides.length; show(i); }, 6000);
  }

  // Forms that open WhatsApp with prefilled message
  function wireForm(id, template){
    const form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      let text = template + "\\n";
      for(const [k,v] of data) {
        text += `${k}: ${v}\\n`;
      }
      const url = 'https://wa.me/qr/EDCZJ7KXH5V2J1?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

  wireForm('donorForm', 'Donor Registration');
  wireForm('requestForm', 'Patient Request');
  wireForm('contactForm', 'Contact Message');

});
