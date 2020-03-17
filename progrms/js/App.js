console.log("app is running!");
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import Loading from "./Loading.js";
import None from "./None.js";
import api from "./api.js";

class App {
  $target = null;
  data = [];
  isLoading = false;
  history = new Set([]);
  keyword = null;

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.setState(true);
        api.fetchCats(keyword).then(({ data }) => {
          if (!data.length) {
            this.none.setState(data);
            this.searchResult.setState(data);
            this.loading.setState(false);
            return;
          }
          this.keyword = keyword;
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
        this.loading.setState(true);
        api.fetchCatInfo(image.id).then(({ data }) => {
          const temperament = data.temperament;
          const origin = data.origin;
          image.temperament = temperament;
          image.origin = origin;
          this.imageInfo.setState({
            visible: true,
            image
          });
          this.loading.setState(false);
        });
      },
      onScrollEvent: () => {
        window.addEventListener(
          "scroll",
          this.debounce(() => {
            console.log(scrollY);
            if (
              document.scrollingElement.scrollHeight - window.scrollY ===
              window.innerHeight
            ) {
              this.loading.setState(true);
              api.fetchCats(this.keyword).then(({ data }) => {
                this.searchResult.setState(data);
                this.loading.setState(false);
              });
              console.log("끝부분");
            }
          }, 4000)
        );
      },
      onLoad: () => {
        console.log("lazyloadImages");
        const imgList = document.getElementsByClassName("lazyload");
        for (let i = 0; i < imgList.length; i++) {
          imgList[i].src = imgList[i].getAttribute("data-src");
        }
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

    this.none = new None({
      $target,
      nowData: this.data
    });
  }

  setState(nextData) {
    console.log(this);
    // validation.isInvalidData(nextData);

    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  debounce(fn, debounceTime) {
    let timer = null;
    return (...args) => {
      const functionToBeCalledLater = () => {
        clearTimeout(timer);
        timer = null;
        return fn(...args);
      };
      if (timer) {
        return;
      }
      timer = setTimeout(functionToBeCalledLater, debounceTime);
    };
  }
}

export default App;
