console.log("app is running!");

class App {
  $target = null;
  data = [];
  isLoading = false;

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    console.log(this.data.length);
    this.$Loading = document.createElement("div");
    if (this.data.length === 0) {
      console.log(this.data.length, this.$target);
      this.$target.appendChild(this.$Loading);
      this.$Loading.classList.add("Loading");
    } else {
      this.$Loading.classList.remove("Loading");
    }
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
