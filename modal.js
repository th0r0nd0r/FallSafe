const modal = document.getElementById("modal");
const btn = document.getElementById("open-modal");
const close = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = "block";
};

close.onclick = () => {
  modal.style.display = "none";
};
