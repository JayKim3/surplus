export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    window.addEventListener("keyup", e => {
      this.onCloseClick(e);
    });

    this.$imageInfo.addEventListener("click", e => {
      this.onCloseClick(e);
    });

    this.onCloseClick = e => {
      if (
        e.target.nodeName === "BUTTON" ||
        e.keyCode === 27 ||
        e.target.className === "ImageInfo"
      ) {
        {
          $imageInfo.style.display = "none";
          $imageInfo.style.backgroundColor = "#fff";
        }
      }
    };

    this.onCheckWidth = () => {
      console.log("onCheckWidth");
      if (window.innerWidth <= 768) {
        console.log("small");
      }
    };

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <h1 class="title">
              <span>${name}</span>
              <button>x</button>
            </h1>
            <img src="${url}" alt="${name}"/>        
            <section class="description">
              <span>성격: ${temperament}</span>
              <br />
              <span>태생: ${origin}</span>
            </section>  
          </div>`;
      this.$imageInfo.style.display = "block";
      // event delegation
      this.$imageInfo.addEventListener("click", this.onCloseClick);
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
