const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const body = document.body;
const cardImage = document.querySelector('.card__img');
const cardText = document.querySelector('.card__text');
const buttonText = document.querySelector('.header__button-change_text');
const buttonImage = document.querySelector('.header__button-change_image');
const cardWrapper = document.querySelector('.card__wrapper');


const state = {
  gender: body.classList.contains('women') ? 'women' : 'men'
};

const getRandomForArray = (arr) => {
  const random = Math.floor(Math.random() * (arr.length ));
  return arr[random];
}

const getData = () => fetch('db.json').then(res => res.json());

const changeDOM = () => {
  if (state.photo.includes('black')) {
    cardText.style.color = '#fff'
  } else {
    cardText.style.color = ''
  }

  cardImage.src = `img/${state.photo}`;
  cardText.innerHTML = state.text.replaceAll('\n', '<br>');
}

const getDataToCard = () => {
  getData().then(data => {
    state.text = getRandomForArray(data.text[state.gender]);
    state.photo = getRandomForArray(data.photo[state.gender]);

    changeDOM();
  });
}

const changeToMen = () => {
  if (state.gender !== 'men') {
    body.classList.add('men');
    body.classList.remove('women');
    state.gender = 'men';
    getDataToCard();
  }
};

const changeToWomen = () => {
  if (state.gender !== 'women') {
    body.classList.add('women');
    body.classList.remove('men');
    state.gender = 'women'
    getDataToCard()
  }
};

const changeText = () => {
  getData().then(data => {
    state.text = getRandomForArray(data.text[state.gender]);
    cardText.innerHTML = state.text.replaceAll('\n', '<br>');
  })
};

const changeImage = () => {
  getData().then(data => {
    state.photo = getRandomForArray(data.photo[state.gender]);

    changeDOM();
  });
}

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);

getDataToCard();

cardWrapper.addEventListener('dblclick', () => {
  const newWindow = window.open('', '', `width=840, height=600, 
    top=${(screen.height / 2) - 600 /2},
    left=${(screen.width / 2) - 840 /2}`);

  html2canvas(cardWrapper).then((canvas) => {
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    newWindow.document.body.prepend(canvas);
  })
})