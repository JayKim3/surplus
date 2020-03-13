function Lotto() {
  const $result = document.querySelector("#result");
  const $bonus = document.querySelector(".bonus");

  const numbers = Array(45)
    .fill()
    .map((element, index) => {
      return index + 1;
    });
  const shuffle = [];

  while (numbers.length > 0) {
    const pick = numbers.splice(
      Math.floor(Math.random() * numbers.length),
      1
    )[0];
    shuffle.push(pick);
  }
  const lottoNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = shuffle[shuffle.length - 1];

  const ballColor = (num, $) => {
    const $ball = document.createElement("div");
    $.appendChild($ball);
    $ball.textContent = num;
    $ball.style.display = "inline-block";
    $ball.style.width = "20px";
    $ball.style.padding = "10px";
    $ball.style.border = "1px solid black";
    $ball.style.borderRadius = "100%";
    $ball.style.textAlign = "center";

    if (num <= 10) {
      $ball.style.background = "red";
    } else if (num <= 20) {
      $ball.style.background = "orange";
    } else if (num <= 30) {
      $ball.style.background = "yellow";
    } else if (num <= 40) {
      $ball.style.background = "green";
    } else {
      $ball.style.background = "blue";
    }
  };

  for (let i = 0; i < lottoNumbers.length; i += 1) {
    setTimeout(() => {
      ballColor(lottoNumbers[i], $result);
    }, i * 1000);
  }

  setTimeout(() => {
    ballColor(bonusNumber, $bonus);
  }, 6000);
}

Lotto();
