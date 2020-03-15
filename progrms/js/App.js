console.log("app is running!");

class App {
  $target = null;
  data = [];
  isLoading = false;
  history = new Set([]);

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.setState(true);
        console.log(validation);
        api.fetchCats(keyword).then(({ data }) => {
          // validation.isInvalidData(data);
          this.setState(data);
          this.searchHistory.setState(keyword);
          this.loading.setState(false);
        });
      },
      onClick: () => {
        this.loading.setState(true);
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.loading.setState(false);
        });
      }
    });

    this.searchHistory = new SearchHistory({
      $target,
      initialHistory: this.history,
      onClickHistory: keyword => {
        console.log(keyword);
        this.loading.setState(true);
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.loading.setState(false);
        });
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

    this.loading = new Loading({
      $target,
      isLoading: false
    });
  }

  setState(nextData) {
    console.log(this);
    // validation.isInvalidData(nextData);

    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
