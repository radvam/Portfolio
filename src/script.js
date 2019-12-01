/* ---------------------Slider---------------------------------------------*/
const items = document.querySelectorAll('.carousel__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active-slide', direction);
  });
}
function showItem(direction) {
  items[currentItem].classList.add('next-slide', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next-slide', direction);
    this.classList.add('active-slide');
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}
function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

document.querySelector('.control.right').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

const swipeDetect = el => {
  const surface = el;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  const threshold = 150;

  const restraint = 100;

  const allowedTime = 300;

  function newDoc() {
    window.location.assign('https://www.w3schools.com');
  }

  surface.addEventListener('touch', function(e) {
    if (e.target.classList.contains('slide__img') && distX === 0) {
      const href = document.createElement('a');
      href.setAttribute('href', './repair.html');
      const node = document.querySelector('.slide__img');
      node.before(href);
      window.location.pathname = '../repair.html';
      newDoc();
    }
  });

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });
  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) < restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    e.preventDefault();
  });

  surface.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
      if (e.target.classList.contains('left')) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      }
    }
    if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
      if (e.target.classList.contains('right')) {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });
  surface.addEventListener('touchend', function(e) {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) < restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    if (e.target.classList.contains('slide__img') && distX === 0) {
      const href = document.createElement('a');
      href.setAttribute('href', './repair.html');
      const node = document.querySelector('.slide__img');
      node.before(href);
    }
  });
};
const el = document.querySelector('.carousel');
swipeDetect(el);

/* ---------------------Education-----------------------------------------------*/
const coll = document.getElementsByClassName('collapsible');

for (let i = 0; i < coll.length; i += 1) {
  coll[i].addEventListener('click', function() {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
}
const mobileCollapse = document.getElementsByClassName('description__mobile');
for (let i = 0; i < mobileCollapse.length; i += 1) {
  mobileCollapse[i].addEventListener('click', function() {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
}

function activeTouch() {
  for (let i = 0; i < mobileCollapse.length; i += 1) {
    mobileCollapse[i].addEventListener('touchend', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  }
}

const touchDetect = elem => {
  const surface = elem;

  let startX = 0;
  let distX = 0;

  surface.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('description__mobile')) {
      activeTouch();
    }
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
  });
  surface.addEventListener('touchend', function(e) {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    if (distX === 0) {
      activeTouch();
    }
  });
};
const elc = document.querySelector('.carousel');
touchDetect(elc);
