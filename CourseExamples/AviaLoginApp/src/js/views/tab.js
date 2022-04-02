const tabs = document.querySelectorAll('.card-tab'),
      cards = document.querySelectorAll('.card-body');
const aside = document.querySelector('.login-greeting-screen'),
      formWrapper = document.querySelector('.login-page-wrapp');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        if(e.target.dataset.section==='registration'){
            hideAside(aside, formWrapper);
        }else {
            unhideAside(aside, formWrapper);
        }
        removeActive();
        addActive(tab);
    });
});

function unhideAside(el, wr){
    wr.classList.remove('_active');
    el.classList.remove('_hide');
}
function hideAside(el, wr){
    wr.classList.add('_active');
    el.classList.add('_hide');
}
function removeActive(){
    tabs.forEach(tab => {
        tab.classList.remove('_active');
    });
    cards.forEach(card => {
        card.classList.remove('_active');
    });
}

function addActive(tab){
    tab.classList.add('_active');
   const section = tab.dataset.section;
   cards.forEach(card => {
        if(card.classList.contains(`${section}`)){
            card.classList.add('_active');
        }
   });
}