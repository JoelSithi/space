const nav =  document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', ()  => {
  const visibility = nav.getAttribute('data-visible');
  
  if (visibility === 'false') {
    nav.setAttribute('data-visible', true); 
    navToggle.setAttribute('aria-expanded', true);
  } else {
    nav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  }
  console.log(navToggle.getAttribute('aria-expanded')); // => qd on click sur le bouton, 'true' apparait qd le menu est ouvert; false apparait
                                                        // qd le menu est fermé donc maintenant on peut utiliser ca dans le css pour mettre en place l'icone X
})