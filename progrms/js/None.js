export default class None {
  constructor({ $target, nowData }) {
    const $None = document.createElement("div");
    this.$None = $None;
    this.data = nowData;
    $target.appendChild($None);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    return (this.$None.innerHTML = `
      <div class="None"><span>None Data</span></div>
      `);
  }
}
