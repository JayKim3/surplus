class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.onCloseClick = e => {
      const clickedNode = e.target.nodeName;
      if (clickedNode === "BUTTON") {
        {
          $imageInfo.style.display = "none";
          $imageInfo.style.backgroundColor = "#fff";
        }
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
              <button class="close">x</button>
            </h1>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = "block";
      // event delegation
      this.$imageInfo.addEventListener("click", this.onCloseClick);
      this.$imageInfo.addEventListener("keypress", e => {
        console.log(e.keyCode);
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
