const buttons = document.getElementsByClassName("addProduct");

Array.from(buttons).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.id);
  });
});
