export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  previousOnload = null;

  constructor({ $target, initialData, onClick, onScrollEvent, onLoad }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onScrollEvent = onScrollEvent;
    this.onLoad = onLoad;

    this.render();
  }

  setState(nextData) {
    this.data = this.data.concat(...this.data, nextData);
    console.log(this.data);
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
            <div class="item">
              <img class="lazyload" data-src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
    this.onScrollEvent();
    this.onLoad();
  }
}
