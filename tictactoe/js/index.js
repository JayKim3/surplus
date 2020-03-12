// 1. 3 x 3 칸 준비 ( x 턴 )
// 2. 칸을 클릭했다 ( Turn )
// 3. 칸이 이미 채워져 있는가 ? Yes- 2번 은로 이동 No - 4번로 이동
// 4. 칸에 X를 표시
// 5. 세 줄이 되었는가 ? ( 가로 , 세로 , 대각선 ) Yes - 성공 return , No - 턴을 넘긴다. ( x->o / o->x )
function tictactoe() {
  const td = document.querySelectorAll("td");
  const result = document.getElementById("result");
  let turn;
  let win;
  let array;

  const init = () => {
    turn = "X";
    win = false;
    array = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    td.forEach(element => {
      element.innerHTML = "";
    });
    result.innerHTML = "";
  };

  const rowCheck = () => {
    if (
      (array[0][0] === turn && array[0][1] === turn && array[0][2] === turn) ||
      (array[1][0] === turn && array[1][1] === turn && array[1][2] === turn) ||
      (array[2][0] === turn && array[2][1] === turn && array[2][2] === turn)
    ) {
      result.innerHTML = `${turn}의 승리!`;
      win = true;
    }
  };

  const columnCheck = () => {
    if (
      (array[0][0] === turn && array[1][0] === turn && array[2][0] === turn) ||
      (array[0][1] === turn && array[1][1] === turn && array[2][1] === turn) ||
      (array[0][2] === turn && array[1][2] === turn && array[2][2] === turn)
    ) {
      result.innerHTML = `${turn}의 승리!`;
      win = true;
    }
  };

  const diagonal = () => {
    if (
      (array[0][0] === turn && array[1][1] === turn && array[2][2] === turn) ||
      (array[0][2] === turn && array[1][1] === turn && array[2][0] === turn)
    ) {
      result.innerHTML = `${turn}의 승리!`;
      win = true;
    }
  };

  td.forEach(element => {
    element.addEventListener("click", e => {
      const htmlString = e.target.textContent;
      const previousNode = e.target.previousElementSibling;
      const nextNode = e.target.nextElementSibling;
      const trId = e.target.parentNode.id;

      if (htmlString === "") {
        if (trId === "0") {
          if (previousNode === null && nextNode !== null) {
            array[0][0] = turn;
          } else if (previousNode !== null && nextNode !== null) {
            array[0][1] = turn;
          } else {
            array[0][2] = turn;
          }
        } else if (trId === "1") {
          if (previousNode === null && nextNode !== null) {
            array[1][0] = turn;
          } else if (previousNode !== null && nextNode !== null) {
            array[1][1] = turn;
          } else {
            array[1][2] = turn;
          }
        } else if (trId === "2") {
          if (previousNode === null && nextNode !== null) {
            array[2][0] = turn;
          } else if (previousNode !== null && nextNode !== null) {
            array[2][1] = turn;
          } else {
            array[2][2] = turn;
          }
        }
        console.log(array);
        rowCheck(); // 가로 같은 모양으로 다 채워졌는지 확인
        columnCheck(); // 세로 같은 모양으로 다 채워졌는지 확인
        diagonal(); // 대각선 같은 모양으로 다 채워졌는지 확인
        element.innerHTML = turn;
        if (win) {
          setTimeout(() => {
            init();
          }, 1000);
        }
        if (turn === "X") turn = "O";
        else turn = "X";
      } else {
        alert("해당 칸은 이미 채워져 있습니다.");
      }
    });
  });

  init();
}

tictactoe();
