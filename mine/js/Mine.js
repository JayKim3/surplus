import { codeTable } from "./util/util.js";

export default function Mine(data, hor, ver, mine, $tbody) {
  this.hor = hor;
  this.ver = ver;
  this.mine = mine;
  this.$tbody = $tbody;
  this.data = data;
  this.shuffle = [];

  this.setState = () => {
    // 지뢰 셋팅
    const candidate = Array(this.hor * this.ver)
      .fill()
      .map((element, index) => {
        return index;
      });
    while (candidate.length > this.hor * this.ver - this.mine) {
      const pick = candidate.splice(
        Math.floor(Math.random() * candidate.length),
        1
      )[0];
      this.shuffle = this.shuffle.concat(pick);
    }
    this.render();
  };

  this.render = () => {
    for (let i = 0; i < this.shuffle.length; i += 1) {
      const minever = Math.floor(this.shuffle[i] / this.ver);
      const minehor = this.shuffle[i] % this.ver;

      this.$tbody.children[minever].children[minehor].textContent =
        codeTable.mine;
      this.data[minever][minehor] = codeTable.mine;
    }
    console.log(this.data);
  };
}
