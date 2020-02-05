let deck_id;

function getDeck(amount){
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + amount;

    let playerCards = document.getElementById("playerCards");
    playerCards.innerHTML = "";

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            deck_id = json.deck_id;
            document.getElementById("deckId").innerHTML = deck_id;
        })
        .catch((error) => console.log(error));
}

function drawCard(amount){
    let url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=" + amount;

    fetch(url)
        .then((response) => response.json())
        .then((json) => addToHand(json))
        .catch((error) => console.log(error));
}

function addToHand(json){
    console.log(json);
    let url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + "player1" + "/add/?cards=";

    for(let i = 0; i < json.cards.length; i++){
        if(i === json.cards.length - 1){
            url += json.cards[i].code;
        } else {
            url += json.cards[i].code + ",";
        }
    }

    fetch(url)
        .then((response) => response.json())
        .then(listhand())
        .catch((error) => console.log(error));
}

function listhand(){
    let url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + "player1" + "/list/";

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let playerCards = document.getElementById("playerCards");
            playerCards.innerHTML = "";
            for(let i = 0; i < json.piles.player1.cards.length; i++){
                let img = document.createElement("img");
                img.className = "card";
                img.src = "cards/" + json.piles.player1.cards[i].code + ".png";
                playerCards.appendChild(img);
            }

        })
        .catch((error) => console.log(error));
}