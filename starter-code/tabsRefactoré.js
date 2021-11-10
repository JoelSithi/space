const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);    

let tabFocus = 0;
function changeTabFocus (e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
     tabs[tabFocus].setAttribute('tabIndex', -1); 
     if (e.keyCode === keydownRight) {
        tabFocus++; 
        if (tabFocus >= tabs.length)  {
        tabFocus = 0;
        }
      } else if (e.keyCode === keydownLeft) {
        tabFocus--; 
        if (tabFocus < 0)  { 
        tabFocus = tabs.length -1;
        }
      } 

      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus(); 
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});

function changeTabPanel(e) {
  const targetTab = e.target; 
  const targetPanel = targetTab.getAttribute('aria-controls'); 
  const targetImage = targetTab.getAttribute('data-image');
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;
  
  tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false); // => Moon n'est plus souligné
  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);
  hideContent(mainContainer, 'picture');
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) { // puisque le mainContainer est le parent de [role="tabpanel"], on peut entre parenthèse dire qu'on sélectionne le parent, puis le content DANS le parent
  // AVANT : mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => panel.setAttribute('hidden', true));
  // APRÈS : (mainContainer devient parent; [role="tabpanel"] devient content; et on remplace panel par item), d'où le code suivant :
  parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  // AVANT : mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
  // APRÈS : (mainContainer devient parent; [`#${targetPanel}`] devient content; et on remplace panel par item)
  parent.querySelector(content).removeAttribute('hidden');
}