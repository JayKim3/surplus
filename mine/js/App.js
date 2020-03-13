// 지뢰 랜덤 생성 후 지뢰 심는 로직 구성 - OK
// 가로 , 세로, 지뢰 수 입력 -> 2차원 배열 동적 생성 후 화면에 출력 - OK
// 마우스 왼쪽 버튼 클릭 시 해당 칸의 데이터가 지뢰 또는 0이 아닐시에는 주변 지뢰 개수 보여주기 -> OK
// 마우스 왼쪽 버튼으로 칸을 클릭할때 해당 칸의 데이터가 0(주변에 지뢰가 없다는걸 의미) 이면 주변 데이터 검사 후 지뢰 찾기 게임 처럼 펼치기
// 마우스 오른쪽 버튼으로 칸을 클릭할때 깃발 -> 물음표 -> X or 빈 값으로 변경
import Table from "./Table.js";
import Mine from "./Mine.js";
import { codeTable } from "./util/util.js";

export default function App() {
  this.init = () => {
    this.hor = parseInt(document.querySelector("#hor").value);
    this.ver = parseInt(document.querySelector("#ver").value);
    this.mine = parseInt(document.querySelector("#mine").value);
    this.$tbody = document.querySelector("#table tbody");
    this.$result = document.querySelector("#result");
    this.$tbody.innerHTML = "";
    this.data = [];

    this.table = new Table(this.onStartClick);
    this.mine = new Mine(this.data, this.hor, this.ver, this.mine, this.$tbody);
  };

  this.onStartClick = () => {
    this.init();
    for (let i = 0; i < this.ver; i += 1) {
      const array = [];
      const $tr = document.createElement("tr");
      for (let j = 0; j < this.hor; j += 1) {
        array.push(codeTable.normal);
        const $td = document.createElement("td");
        $tr.appendChild($td);
      }
      this.data.push(array);
      this.$tbody.appendChild($tr);
    }
    console.log(this.data);
    this.$tbody.addEventListener("click", this.onCanneClick);
    this.mine.setState();
  };

  this.onCanneClick = e => {
    const clickedTd = e.target;
    const parentTr = e.target.parentNode;
    const parentTbody = e.target.parentNode.parentNode;
    const Canne = Array.prototype.indexOf.call(parentTr.children, clickedTd);
    const Line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

    clickedTd.classList.add("opened");
    if (this.data[Line][Canne] === codeTable.mine) {
      this.$tbody.children[Line].children[Canne].textContent = "펑";
    } else {
      //해당 칸 데이터가 0또는 지뢰가 아닐시
      let surround = [this.data[Line][Canne - 1], this.data[Line][Canne + 1]];
      if (this.data[Line - 1]) {
        surround = surround.concat([
          this.data[Line - 1][Canne - 1],
          this.data[Line - 1][Canne],
          this.data[Line - 1][Canne + 1]
        ]);
      }
      if (this.data[Line + 1]) {
        surround = surround.concat([
          this.data[Line + 1][Canne - 1],
          this.data[Line + 1][Canne],
          this.data[Line + 1][Canne + 1]
        ]);
      }

      const surroundMine = surround.filter(v => {
        return v === codeTable.mine;
      }).length;

      clickedTd.textContent = surroundMine;
      // 해당 칸 데이터가 0 일시
      if (surroundMine === codeTable.normal) {
        let surroundCanne = [];

        if (this.$tbody.children[Line - 1]) {
          surroundCanne = surroundCanne.concat(
            this.$tbody.children[Line - 1].children[Canne - 1],
            this.$tbody.children[Line - 1].children[Canne],
            this.$tbody.children[Line - 1].children[Canne + 1]
          );
        }
        console.log(surroundCanne);
        surroundCanne = surroundCanne.concat([
          this.$tbody.children[Line].children[Canne - 1],
          this.$tbody.children[Line].children[Canne + 1]
        ]);
        if (this.$tbody.children[Line + 1]) {
          surroundCanne = surroundCanne.concat(
            this.$tbody.children[Line + 1].children[Canne - 1],
            this.$tbody.children[Line + 1].children[Canne],
            this.$tbody.children[Line + 1].children[Canne + 1]
          );
        }
        console.log(surroundCanne);

        surroundCanne
          .filter(v => {
            return !!v;
          })
          .forEach(nextCanne => {
            console.log(nextCanne);
            nextCanne.click();
          });
      }
    }
  };
  this.init();
}

new App();
