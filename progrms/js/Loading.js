export default class Loading {
  constructor({ $target, isLoading }) {
    const $Loading = document.createElement("div");
    this.$Loading = $Loading;
    $target.appendChild($Loading);

    this.isLoading = isLoading;
  }

  setState(nextData) {
    this.isLoading = nextData;
    this.render();
  }

  render() {
    if (this.isLoading) {
      return (this.$Loading.innerHTML = `
      <div class="Loading"><span>Loading...</span></div>`);
    } else {
      this.$Loading.innerHTML = "";
    }
  }
}
