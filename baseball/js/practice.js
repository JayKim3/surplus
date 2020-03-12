export default function practice() {
  const result = document.querySelector("h1");
  const form = document.querySelector("form");
  const input = document.querySelector("input");

  this.init = () => {
    this.numbers = [];
    this.balls = [];
    this.count = 0;
    this.strike = 0;
    this.ball = 0;
    this.pickNumber();
  };

  this.pickNumber = () => {
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 4; i += 1) {
      const pick = this.numbers.splice(
        Math.floor(Math.random() * (9 - i)),
        1
      )[0]; // splice는 배열을 반환
      this.balls.push(pick);
    }
  };

  form.addEventListener("submit", e => {
    console.log(this.balls);
    e.preventDefault();

    this.answer = input.value;

    if (this.answer === this.balls.join("")) {
      result.textContent = "홈런";
      input.value = "";
      input.focus();
      this.pickNumber();
    } else {
      this.answerArray = this.answer.split("");
      this.strike = 0;
      this.ball = 0;
      this.count += 1;

      if (this.count > 10) {
        result.textContent = `10번 넘게 틀려 실패 ! 답은 ${this.balls.join(
          ","
        )} 였습니다!`;
        input.value = "";
        input.focus();
        this.pickNumber();
        this.count = 0;
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (Number(this.answerArray[i]) === this.balls[i]) {
            this.strike += 1;
          } else if (this.balls.indexOf(Number(this.answerArray[i])) > -1) {
            this.ball += 1;
          }
        }
        result.textContent = `${this.strike} 스트라이크 ${this.ball} 볼입니다.`;
        input.value = "";
        input.focus();
      }
    }
  });
  this.init();
}
