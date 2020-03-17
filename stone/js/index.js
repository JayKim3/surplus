// 자바스크립트는 객체 속성 수정 시에는 참조이지만 객체 자체를 수정할 시에는 관계가 깨진다. -> call by reference가 정확히 아님
// 생성자와 new -> 객체 지향 방식

function Stone() {
  this.$turnBtn = document.getElementById("turn-btn");

  this.rival = {
    $hero: document.getElementById("rival-hero"),
    $deck: document.getElementById("rival-deck"),
    $field: document.getElementById("rival-cards"),
    $cost: document.getElementById("rival-cost"),
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedCard: null,
    selectedCardData: null
  };
  this.me = {
    $hero: document.getElementById("my-hero"),
    $deck: document.getElementById("my-deck"),
    $field: document.getElementById("my-cards"),
    $cost: document.getElementById("my-cost"),
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedCard: null,
    selectedCardData: null
  };

  this.turn = true;

  this.init = () => {
    this.createRivalHero();
    this.createMyHero();
    this.createMyDeck(5);
    this.createRivalDeck(5);
    this.redrawScreen(true);
    this.redrawScreen(false);
  };

  this.redrawScreen = meScreen => {
    const object = meScreen ? this.me : this.rival;
    object.$deck.innerHTML = "";
    object.$field.innerHTML = "";
    object.$hero.innerHTML = "";
    object.deckData.forEach(data => {
      this.cardDomConnect(data, object.$deck);
    });
    object.fieldData.forEach(data => {
      this.cardDomConnect(data, object.$field);
    });
    this.cardDomConnect(object.heroData, object.$hero, true);
  };

  this.deckToField = (data, mine) => {
    const object = mine ? this.me : this.rival;

    const currentMyCost = Number(object.$cost.textContent);

    if (currentMyCost < data.cost) {
      return "end";
    }
    const idx = object.deckData.indexOf(data);
    object.deckData.splice(idx, 1);
    object.fieldData.push(data);
    // console.log(data, idx, this.myDeckdata, this.myFielddata);
    object.$deck.innerHTML = "";
    object.$field.innerHTML = "";
    object.deckData.forEach(data => {
      this.cardDomConnect(data, object.$deck);
    });
    object.fieldData.forEach(data => {
      this.cardDomConnect(data, object.$field);
    });
    data.field = true;
    object.$cost.textContent = currentMyCost - data.cost;
  };

  this.turnPerform = (card, data, mine) => {
    const friendly = mine ? this.me : this.rival;
    const enemy = mine ? this.rival : this.me;
    if (card.classList.contains("card-turnover")) {
      return;
    }

    const enemyCard = mine ? !data.mine : data.mine;
    if (enemyCard && friendly.selectedCard) {
      // 적군 카드면서 아군 카드가 선택되어 있고, 또 그게 턴이 끝난 카드가 아니면 공격
      data.hp = data.hp - friendly.selectedCardData.att;
      if (data.hp <= 0) {
        const idx = enemy.fieldData.indexOf(data);
        if (idx > -1) {
          // 쫄병이 죽었을 때
          enemy.fieldData.splice(idx, 1);
        } else {
          // 영웅이 죽었을 때
          this.init();
        }
      }
      this.redrawScreen(!mine);
      friendly.selectedCard.classList.remove("card-selected");
      friendly.selectedCard.classList.add("card-turnover");
      friendly.selectedCard = null;
      friendly.selectedCardData = null;
      return;
    } else if (enemyCard) {
      // 상대 카드거나 카드가 필드에 있을 시 리턴
      return;
    }
    if (data.field) {
      document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("card-selected");
      });
      card.classList.add("card-selected");
      friendly.selectedCard = card;
      friendly.selectedCardData = data;
    } else {
      if (this.deckToField(data, true) !== "end") {
        mine ? this.createMyDeck(1) : this.createRivalDeck(1);
      }
    }
  };

  this.cardDomConnect = (data, dom, hero) => {
    const card = document.querySelector(".card-hidden .card").cloneNode(true); // 인자로 true를 넣어줘야 내부까지 복사
    card.querySelector(".card-cost").textContent = data.cost;
    card.querySelector(".card-att").textContent = data.att;
    card.querySelector(".card-hp").textContent = data.hp;
    if (hero) {
      card.querySelector(".card-cost").style.display = "none";
      const heroName = document.createElement("div");
      heroName.textContent = "영웅";
      card.appendChild(heroName);
    }
    card.addEventListener("click", () => {
      this.turnPerform(card, data, this.turn);
    });
    dom.appendChild(card);
  };

  this.createRivalHero = () => {
    this.rival.heroData = this.createCardFactory(true);
    this.cardDomConnect(this.rival.heroData, this.rival.$hero, true);
  };

  this.createMyHero = () => {
    this.me.heroData = this.createCardFactory(true, true);
    this.cardDomConnect(this.me.heroData, this.me.$hero, true);
  };

  this.createMyDeck = num => {
    for (let i = 0; i < num; i += 1) {
      this.me.deckData.push(this.createCardFactory(false, true));
    }
    this.me.$deck.innerHTML = "";
    this.me.deckData.forEach(data => {
      this.cardDomConnect(data, this.me.$deck);
    });
  };

  this.createRivalDeck = num => {
    for (let i = 0; i < num; i += 1) {
      this.rival.deckData.push(this.createCardFactory());
    }
    this.rival.$deck.innerHTML = "";
    this.rival.deckData.forEach(data => {
      this.cardDomConnect(data, this.rival.$deck);
    });
  };

  function card(hero, mine) {
    if (hero) {
      this.att = Math.ceil(Math.random() * 2);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.hero = true;
      this.field = true;
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5);
      this.cost = (this.att + this.hp) / 2;
    }
    if (mine) {
      this.mine = true;
    }
  }

  this.createCardFactory = (hero, mine) => {
    return new card(hero, mine);
  };

  this.$turnBtn.addEventListener("click", () => {
    const object = this.turn ? this.me : this.rival;
    document.getElementById("rival").classList.toggle("turn");
    document.getElementById("my").classList.toggle("turn");
    object.$field.innerHTML = "";
    object.$hero.innerHTML = "";
    object.fieldData.forEach(data => {
      this.cardDomConnect(data, object.$field);
    });
    this.cardDomConnect(object.heroData, object.$hero, true);
    this.turn = !this.turn;
    if (this.turn) {
      this.me.$cost.textContent = 10;
    } else {
      this.rival.$cost.textContent = 10;
    }
  });

  this.init();
}
new Stone();
