// BURGER MENU
{
    const burger = document.querySelector('.header-burger');
    const overlay = document.querySelector('.nav-overlay');
    const mobileMenu = document.querySelector('.header-nav-mobile');
    const closeBTN = document.querySelector('.close-menu');
    const menuItems = document.querySelectorAll('.header-menu-item');
    const headerBG = document.querySelector('.header-nav-mobile');

    function showMenu () {
        overlay.classList.add('overlay-active');
        mobileMenu.classList.add('nav-mobile-active');
    }

    function hideMenu () {
        overlay.classList.remove('overlay-active');
        mobileMenu.classList.remove('nav-mobile-active');
    }

    burger.addEventListener('click', showMenu);
    closeBTN.addEventListener('click', hideMenu);
    overlay.addEventListener('click', hideMenu);
    headerBG.addEventListener('click', hideMenu);
    menuItems.forEach(item => {item.addEventListener('click', hideMenu)});
}

// смена фокуса на услугах в разделе service
{
    const serviceCards = document.querySelectorAll('.service-item');
    const serviceButtons = document.querySelectorAll('.buttons-services');

    serviceButtons.forEach(button => button.addEventListener('click', activeButtonToggle));

    //вешаю актив на кнопку, не больше 2х кнопок
    function activeButtonToggle (event) {
        const button = event.target;
        button.classList.toggle('active-btn');

        const buttonsActive = document.querySelectorAll('.active-btn');    

        if (buttonsActive.length == 3) {
            buttonsActive.forEach(btn => {
                if (btn != button) {
                    btn.classList.remove('active-btn')
                }
            })
        };
        addBlur();
        removeBlur ();
    }; 

    //добавить размытие
    function addBlur () {
        const buttonsActive = document.querySelectorAll('.active-btn');
        
        if (buttonsActive.length) {
            serviceCards.forEach(card => card.classList.add('blur'));

            for (let button of buttonsActive) {
                serviceCards.forEach(card => {
                    if (card.classList.contains(button.innerHTML)) {
                        card.classList.remove('blur');
                    }
                });
            }
        }
    };
    //удалить размытие
    function removeBlur () {
        const buttonsActive = document.querySelectorAll('.active-btn');

        if (buttonsActive.length == 0) {
            serviceCards.forEach(card => card.classList.remove('blur'))
        }
    };
}

// Accordion 
{
    const details = document.querySelectorAll('.details');

    details.forEach(detail => detail.addEventListener('click', openDetails));

    function openDetails (event) {
        const targetDetails = event.target;
        details.forEach(detail => {
            if (detail != targetDetails.parentNode) {
                detail.removeAttribute('open')
            }
        })
        
    };
}

//SELECT

{
    const select = document.querySelector('.select');
    const selectHeader = document.querySelector('.select-header');
    const selectItems = document.querySelectorAll('.city-item');
    const womanPhoto = document.querySelector('.woman-photo')

    selectHeader.addEventListener('click', toggleActiveSelect);
    
    selectItems.forEach((item) => {
        item.addEventListener('click', selectCity)
    });

    function toggleWomanPhoto () {
        if ( window.innerWidth <= 380 ){
            const cityCards = Array.from(document.querySelectorAll('.city-card'));
            const cityCardSelected = ((item) => item.classList.contains('selected-city'));
    
            if ((select.classList.contains('select_is-active')) || (cityCards.some(cityCardSelected))) {
                hideWomanPhoto ();
            } else {
                showWomanPhoto ();
            };
        };
    };
     
    function hideWomanPhoto () {
        womanPhoto.classList.add('hidden');
    };

    function showWomanPhoto () {
        womanPhoto.classList.remove('hidden');
    };

    function selectedChangeColor () {
        const cityCards = Array.from(document.querySelectorAll('.city-card'));
        const cityCardSelected = ((item) => item.classList.contains('selected-city'));

        if ( cityCards.some(cityCardSelected) ) {
            selectHeader.classList.add('select-header__selected-city');
        };
    };

    function toggleActiveSelect () {
        select.classList.toggle('select_is-active');
        toggleWomanPhoto ();
        adressDisactivate ();
    };


    function selectCity (event) {
        const city = event.target.innerHTML;
        const currentChosen = document.querySelector('.select-current');
        currentChosen.innerHTML = city;
        select.classList.remove('select_is-active');
        toggleWomanPhoto ();
    };

    // <!-- блок с адресом и телефоном офиса в определенном городе -->

    const cities = document.querySelectorAll('.city-item');
    const currentChosen = document.querySelector('.select-current');

    cities.forEach((city) => {
        city.addEventListener('click', adressActivate);
    })

    function adressActivate () {
   
        const Yonkers = document.querySelector('.Yonkers');
        const Sherrill = document.querySelector('.Sherrill');
        const Canandaigua = document.querySelector('.Canandaigua');
        const NewYorkCity = document.querySelector('.NewYorkCity');

        const currentCity = currentChosen.innerHTML;

        switch(currentCity) {
            case 'Yonkers, NY':
                Yonkers.classList.add('selected-city');
                break;
            case 'Sherrill, NY':
                Sherrill.classList.add('selected-city');
                break;
            case 'Canandaigua, NY':
                Canandaigua.classList.add('selected-city');
                break;
            case 'New York City':
                NewYorkCity.classList.add('selected-city');
                break;
        };
        toggleWomanPhoto ();
        selectedChangeColor ();
    };

    function adressDisactivate () {

        const select = document.querySelector('.select');
        const cityCards = document.querySelectorAll('.city-card');

        if (select.classList.contains('select_is-active')) {
            cityCards.forEach((card) => {card.classList.remove('selected-city')})
        } else {
            adressActivate ();
        }
    };
}
