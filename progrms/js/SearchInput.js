const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $searchInput = document.createElement("input");
    const $randomButton = document.createElement("button");
    const $toggleCheckBox = document.createElement("input");
    const $toggleLabel = document.createElement("label");
    let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    this.onSearch = onSearch;
    this.$searchInput = $searchInput;
    this.$randomButton = $randomButton;
    this.$toggleCheckBox = $toggleCheckBox;
    this.$toggleLabel = $toggleLabel;

    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";
    this.$searchInput.autofocus = "true";

    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "랜덤버튼";

    this.$toggleLabel.innerHTML = "Toggle";

    this.$toggleCheckBox.type = "checkbox";
    this.$toggleCheckBox.className = "ToggleCheckBox";

    $target.appendChild(this.$toggleLabel);
    this.$toggleLabel.appendChild(this.$toggleCheckBox);
    $target.appendChild(this.$searchInput);
    $target.appendChild(this.$randomButton);

    this.$searchInput.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        console.log("test");
        this.onSearch(e.target.value);
      }
    });

    this.$randomButton.addEventListener("click", onClick);

    this.$toggleCheckBox.addEventListener("click", e => {
      if (e.target.checked && !isDarkMode) {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        isDarkMode = true;
      } else if (!e.target.checked && isDarkMode) {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
        isDarkMode = false;
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
