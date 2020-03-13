// 첫 번째 클릭은 지뢰가 아니도록
// target vs e.currentTarget -> target은 이벤트가 실제로 발생하는 타겟 , e.currentTarget은 이벤트가 직접 걸린 타겟

function Mine() {
  const execBtn = document.querySelector("#start");
  const tbody = document.querySelector("#table tbody");
  const result = document.querySelector("#result");
  const hor = parseInt(document.querySelector("#hor").value);
  const ver = parseInt(document.querySelector("#ver").value);
  const mine = parseInt(document.querySelector("#mine").value);
  let dataset = [];
  let flag = false;
  let openCanne = 0;
  const codetable = {
    openCanne: -1,
    question: -2,
    flag: -3,
    falgmine: -4,
    questionmine: -5,
    mine: 1,
    normal: 0
  };
  execBtn.addEventListener("click", () => {
    tbody.innerHTML = "";
    result.textContent = "";
    dataset = [];
    flag = false;
    openCanne = 0;

    // mine 위치 뽑기
    const candidate = Array(hor * ver)
      .fill()
      .map((element, index) => {
        return index;
      });
    const shuffle = [];

    while (candidate.length > hor * ver - mine) {
      const pick = candidate.splice(
        Math.floor(Math.random() * candidate.length),
        1
      )[0];
      shuffle.push(pick);
    }
    console.log(shuffle);

    // 테이블 만들기

    for (let i = 0; i < ver; i += 1) {
      const arr = [];
      const tr = document.createElement("tr");
      dataset.push(arr);
      for (let j = 0; j < hor; j += 1) {
        arr.push(0);
        const td = document.createElement("td");
        td.addEventListener("contextmenu", e => {
          if (flag) {
            return;
          }
          const parentTr = e.currentTarget.parentNode;
          const parentTbody = e.currentTarget.parentNode.parentNode;
          const Canne = Array.prototype.indexOf.call(parentTr.children, td);
          const line = Array.prototype.indexOf.call(parentTbody.children, tr);
          if (td.textContent === "" || td.textContent === "X") {
            td.textContent = "!";
          } else if (td.textContent === "!") {
            td.textContent = "?";
          } else if (td.textContent === "?") {
            if (dataset[line][Canne] === 1) {
              td.textContent = "";
            } else if (dataset[line][Canne] === "X") {
              td.textContent = "X";
            }
          }

          //   console.log(td, Canne, line);
          console.log(dataset);
        });
        td.addEventListener("click", e => {
          if (flag) {
            return;
          }
          // 클릭 했을때 주변 지뢰 개수
          const parentTr = e.currentTarget.parentNode;
          const parentTbody = e.currentTarget.parentNode.parentNode;
          const Canne = Array.prototype.indexOf.call(parentTr.children, td);
          const line = Array.prototype.indexOf.call(parentTbody.children, tr);
          if (dataset[line][Canne] === 1) {
            return;
          }

          td.classList.add("opened");
          openCanne += 1;
          if (dataset[line][Canne] === "X") {
            td.textContent = "펑";
            result.textContent = "실패~";
            flag = true;
          } else {
            let surround = [dataset[line][Canne - 1], dataset[line][Canne + 1]];
            if (dataset[line - 1]) {
              surround = surround.concat(
                dataset[line - 1][Canne - 1],
                dataset[line - 1][Canne],
                dataset[line - 1][Canne + 1]
              );
            }
            if (dataset[line + 1]) {
              surround = surround.concat(
                dataset[line + 1][Canne - 1],
                dataset[line + 1][Canne],
                dataset[line + 1][Canne + 1]
              );
            }
            const surroundMine = surround.filter(v => {
              return v === "X";
            }).length; //숫자
            td.textContent = surroundMine || ""; // 앞의 값 surroundMine이 거짓일 시 "" 사용
            dataset[line][Canne] = 1;
            if (surroundMine === 0) {
              let surroundCanne = [];
              if (tbody.children[line - 1]) {
                surroundCanne = surroundCanne.concat([
                  tbody.children[line - 1].children[Canne - 1],
                  tbody.children[line - 1].children[Canne],
                  tbody.children[line - 1].children[Canne + 1]
                ]);
              }
              surroundCanne = surroundCanne.concat([
                tbody.children[line].children[Canne - 1],
                tbody.children[line].children[Canne + 1]
              ]);
              if (tbody.children[line + 1]) {
                surroundCanne = surroundCanne.concat([
                  tbody.children[line + 1].children[Canne - 1],
                  tbody.children[line + 1].children[Canne],
                  tbody.children[line + 1].children[Canne + 1]
                ]);
              }
              // 배열에서 undefined or null or 빈 문자열을 제거하는 코드
              console.log(surroundCanne);

              surroundCanne
                .filter(v => {
                  return !!v;
                })
                .forEach(nextCanne => {
                  const parentTr = nextCanne.parentNode;
                  const parentTbody = nextCanne.parentNode.parentNode;
                  const nextCanneCanne = Array.prototype.indexOf.call(
                    parentTr.children,
                    nextCanne
                  );
                  const nextCanneLine = Array.prototype.indexOf.call(
                    parentTbody.children,
                    parentTr
                  );
                  console.log(dataset[nextCanneLine][nextCanneCanne]);
                  if (dataset[nextCanneLine][nextCanneCanne] !== 1) {
                    nextCanne.click();
                  }
                });
            }
          }
          if (openCanne === hor * ver - mine) {
            flag = true;
            result.textContent = "승리~";
          }
        });
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    // 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
      const verMine = Math.floor(shuffle[k] / ver);
      const horMine = shuffle[k] % ver;
      tbody.children[verMine].children[horMine].textContent = "X";
      dataset[verMine][horMine] = "X";
    }
    console.log(dataset);
  });
}

Mine();
