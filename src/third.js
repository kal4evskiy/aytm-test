import { Observable } from 'rxjs';
const { fromEvent } = Observable;

const target = document.querySelector('#target');
const mouseUp = fromEvent(target, 'mouseup');
const mouseDown = fromEvent(target, 'mousedown');
const mouseMove = fromEvent(document, 'mousemove');

const CELL_SIZE = 20;

mouseDown.flatMap((e) => {
  const targetWidth = e.target.offsetWidth,
        targetHeight = e.target.offsetHeight,
        startX = e.clientX + window.scrollX,
        startY = e.clientY + window.scrollY,
        startLeft = parseInt(e.target.offsetLeft) || 0,
        startTop = parseInt(e.target.offsetTop) || 0;

  return mouseMove.map((e) => {
    e.preventDefault();

    // init position
    let left = startLeft + e.clientX - startX;
    let top = startTop + e.clientY - startY;

    // grid behaviour
    if (e.shiftKey) {
      if ((left % CELL_SIZE) < (CELL_SIZE)) {
        left = Math.trunc(left / CELL_SIZE) * CELL_SIZE;
      }
      if ((top % CELL_SIZE) < (CELL_SIZE)) {
        top = Math.trunc(top / CELL_SIZE) * CELL_SIZE;
      }
    }

    // bounds handling
    left = left > 0 ? left : 0;
    top = top > 0 ? top : 0;

    left = left < (e.view.innerWidth - targetWidth) ? left : (e.view.innerWidth - targetWidth);
    top = top < (e.view.innerHeight - targetHeight) ? top : (e.view.innerHeight - targetHeight);

    return {
      left,
      top,
    };
  }).takeUntil(mouseUp);
}).subscribe((pos) => {
  target.style.top = `${pos.top}px`;
  target.style.left = `${pos.left}px`;
});

module.hot.accept();
