class SearchHistory {
  constructor({ $target, initialHistory, onClickHistory }) {
    const $searchHistory = document.createElement("div");
    this.$searchHistory = $searchHistory;
    this.$searchHistory.className = "SearchHistory";
    $target.appendChild($searchHistory);

    this.history = initialHistory;
    this.onClickHistory = onClickHistory;
  }

  setState(nextData) {
    this.$searchHistory.style.display = "block";
    this.history.add(nextData);
    this.render();
  }
  render() {
    this.$searchHistory.innerHTML = Array.from(this.history)
      .map(history => `<span>${history}</span>`)
      .join("");

    this.$searchHistory.querySelectorAll("span").forEach($item => {
      $item.addEventListener("click", e => {
        this.onClickHistory(e.target.textContent);
      });
    });
  }
}
