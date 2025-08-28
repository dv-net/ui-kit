export function toogleHiddenClass(value: boolean) {
  const htmlEl = document.querySelector("html");
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (value) {
    htmlEl?.classList.add("is-hidden");
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  } else {
    htmlEl?.classList.remove("is-hidden");
    document.body.style.paddingRight = ``;
  }
}
