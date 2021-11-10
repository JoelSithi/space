const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

/* ------- PASSER D'UN TABS À UN AUTRE AVEC UN FOCUS */
let tabFocus = 0;

tabList.addEventListener('keydown', (e) => {
  console.log(e.keyCode);
  const keydownLeft = 37;
  const keydownRight = 39;

  //quand on a un keydown (peu importe la D ou la Gauche), change the tabindex of the current tab to -1:
  if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    //console.log('test'); // => que l'on appuie sur la fleche de G ou de droite de notre pavé, on a bien le mot test dans la console
    //console.log(tabs); // on obtient une nodelist de 4 elements qui correspondent aux 4 boutons
    //console.log(tabs[0]); // on sélectionne le 1er bouton
    //console.log(tabs[tabFocus]); // ca donne la meme chose : on sélectionne toujour le 1er bouton car notre tabFocus à la valeur de zéro
    tabs[tabFocus].setAttribute('tabIndex', -1); // on change le tabindex à -1
  }
  // if the right key is pushed, move to the next tab on the right:
  if(e.keyCode === keydownRight) {
    tabFocus++; // OU tabFocus = tabFocus + 1
    console.log(tabFocus); // dans la console , on a bien 1 2 3 4

    // qd l'utilisateur arrive à la fin ( cad au dernier élément), s'il réappuie sue la fleche de droite, on veut que ca reparte au début(cad revenir au 1er élément )
    console.log(tabs.length); // = 4 éléments dans tabs
    if (tabFocus >= tabs.length)  {
      tabFocus = 0;
    }

  }
  // if the left key is pushed, move to the next tab on the left:
  if(e.keyCode === keydownLeft) {
    tabFocus--; 
    console.log(tabFocus); // 1- appuyer sur la touche tabulation => Moon est selectionné
                          // 2- avec la fleche DROITE, on appuie , on a 1 2 3
                          // 3- avec la flèche GAUCHE, qd on appuie, , on a 2 1 0 => donc on peut bien revenir en arrière

    // permet de revenir vers la G en appuyant sur la flèche Gauche, qd on arrive à la fin
    if (tabFocus < 0)  { 
      tabFocus = tabs.length -1;// sachant que tabs.lenght = 4 ( 4 éléments), et comme c 'est un tableau 
      //et que lon compte à partir de zéro ( 0 1 2 3 = '3 éléments'), il faut 
      // soustraire -1 à notre tabs.length pour arriver à 3
    }
  }
  tabs[tabFocus].setAttribute('tabindex', 0);
  tabs[tabFocus].focus(); // permet d'avoir le focus
})

// A LA FIN, IL A TOUT MIS DANS UNE FONCTION :
//  const tabList = document.querySelector('[role="tablist"]');
//  const tabs = tabList.querySelectorAll('[role="tab"]');

// tabList.addEventListener('keydown', changeTabFocus);    

// let tabFocus = 0;
// function changeTabFocus (e) {
//      const keydownLeft = 37;
//      const keydownRight = 39;

//      if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
//      tabs[tabFocus].setAttribute('tabIndex', -1); 
//      }
  
//      if(e.keyCode === keydownRight) {
//        tabFocus++; 
//        if (tabFocus >= tabs.length)  {
  //      tabFocus = 0;
  //      }
//      }

//      if(e.keyCode === keydownLeft) {
//        tabFocus--; 
//        if (tabFocus < 0)  { 
//        tabFocus = tabs.length -1;
//        }
//      }

//      tabs[tabFocus].setAttribute('tabindex', 0);
//      tabs[tabFocus].focus(); 
//  
//      }

/* ------- AFFICHER LE CONTENU DE CHAQUE TAB QD ON CLICK SUR CE TAB : */

/* --- 1  -------
  tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    //console.log(tab); => qd on click sur Moon ( ou Mars...) on récupère bien le bouton
  })
})*/

/* --- 2 ------- : on créé la fonction changeTabPanel */
tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});

function changeTabPanel(e) {
  /* 1- on récupère le tab */
  const targetTab = e.target; // = on sélectionne le tab que l'on a cliqué
  //console.log(targetTab);// la meme chose que le console log(tab): on récupère bien chaque bouton au click dessus

  /* 2- on relie chaque panel grace à son attribut */
  const targetPanel = targetTab.getAttribute('aria-controls'); // = dans le html, on a un attribut pour chaque bouton que l'on va pouvoir utiliser pour trouver chaque panel
  // => pour chaque button, l'attribut aria-controls va nous mener à l'id se trouvant dans <article>
  //console.log(targetPanel); // au click sur Moon (et sur Mars etc...), on a bien récupéré son aria-controls, cad moon-tab, qui est le nom du panel que l'on veut activer

  /* 6- MONTRER L' IMAGE : il faut créer id='moon-image' etc... dans le html pour chaque <picture></picture>
            ET créer data-image='moon-image' etc... pour chaque BUTTON*/
  const targetImage = targetTab.getAttribute('data-image');

  /* 3- enfin, on veut montrer le panel : pour cela, on doit monter dans "l'arbre" */
  const tabContainer = targetTab.parentNode;
  //console.log(tabContainer); // on a bien le parent de chaque bouton : la <div> 
  const mainContainer = tabContainer.parentNode;
  //console.log(mainContainer); // on a bien le parent de la <div> : le <main > 

  /* 7- HIGHLIGHTING THE ACTIVE TAB : */
  tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false); // => Moon n'est plus souligné
  targetTab.setAttribute('aria-selected', true); // => quelque soit notre targetTab (cad les buttons), on met l'aria-selected à true pour montrer que le focus est actif ( = MOON en orange, Mars en orange etc...)


  /* 4- il faut cacher le contenu : on a choisi de TOUT cacher */
  mainContainer.querySelectorAll('article').forEach((article) => article.setAttribute('hidden', true));
  // OU mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => panel.setAttribute('hidden', true));

  /* 3 suite*/ /* et 4- on montre chaque panel */
  mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

  /* 5- CACHER TOUTES LES IMAGES */
  mainContainer.querySelectorAll('picture').forEach((picture) => picture.setAttribute('hidden', true));

  /* 6- MONTRER L' IMAGE */
  mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
}