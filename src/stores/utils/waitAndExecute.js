export function waitAndExecute(func, miliseconds = 3000){
    function go() { 
        setTimeout(() => { 
            func();
        }, miliseconds); 

    } 
    go();
}

export function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }