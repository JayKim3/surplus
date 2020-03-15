const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $searchInput = document.createElement("input");
    const $randomButton = document.createElement("button");
    this.$searchInput = $searchInput;
    this.$randomButton = $randomButton;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";
    $randomButton.className = "RandomButton";
    $randomButton.textContent = "랜덤버튼";
    this.$searchInput.autofocus = "true";
    $target.appendChild($searchInput);
    $target.appendChild($randomButton);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
        $searchInput.value = "";
      }
    });

    $randomButton.addEventListener("click", onClick);

    console.log("SearchInput created.", this);
  }
  render() {}
}
