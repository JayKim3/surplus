export default function Table(onStartClick) {
  this.$startBtn = document.querySelector("#start");
  this.onStartClick = onStartClick;

  this.$startBtn.addEventListener("click", this.onStartClick);
}
