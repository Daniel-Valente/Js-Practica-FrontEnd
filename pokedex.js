
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');
const pokeInfo = document.getElementById('pokeInfo');
const pokeClean = document.getElementById('pokeClean');

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    pokeClean.disabled = false;
    document.getElementById("pokeName").value = "";
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/error-404-not-found.png")
            document.getElementById("pokedex").innerHTML = "POKEDEX";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let pokeID = data.id;
            let pokeNameApi = data.name;
            const { moves, stats, types } = data;
            console.log(data)
            console.log(types)
            console.log(moves)
            pokeImage(pokeImg);
            console.log(pokeImg);

            PokeTypes(types);
            PokeStats(stats);
            PokeMoves(moves, types);
            pokeInfo.disabled = false; 
            document.getElementById("pokedex").innerHTML = "#" + pokeID + " " + pokeNameApi.toUpperCase();
            document.getElementById("pokeName").value = "";
            changeColor(data.types[0].type.name);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const cleanPokeInput = () => {
    pokeImage("./img/logo pokedex.png");
    document.getElementById("pokeName").value = "";
    pokeTypes.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeInfo.disabled = true; 
    document.getElementById("pokedex").innerHTML = "POKEDEX";

    changeColor("default");
    pokeClean.disabled = true;
}

const modalPanel = () => {
    let pokeName  = document.getElementById("pokeName").value;
    if (pokeName != "") {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
}

const modalPanelAux = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

const closeModalPanel = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

const changeColor = (color) => {
    var card = document.getElementsByClassName("content")[0];
    card.style.background = typeColors[color];
}

const PokeTypes = (types) => {
    pokeTypes.innerHTML = "";

    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const PokeStats = (stats) => {
    pokeStats.innerHTML = "";

    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAnount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAnount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAnount);
        pokeStats.appendChild(statElement);
    });
}

const PokeMoves = (moves) => {
    pokeMoves.innerHTML = "";
    i = 0;
    while(i < 10) {
        move = moves[i];
        
        const moveElement = document.createElement("div");
        moveElement.textContent = move.move.name;
        moveElement.style.backgroundColor = "#050D2C";
        moveElement.style.color = "#fff";
        pokeMoves.appendChild(moveElement);
        i++;
    }
}

const typeColors = {
    electric: "#FFEA70",
    normal: "#B09398",
    fire: "#FF675C",
    water: "#0596C7",
    ice: "#AFEAFD",
    rock: "#999799",
    flying: "#7AE7C7",
    grass: "#4A9681",
    psychic: "#FFC6D9",
    ghost: "#561D25",
    bug: "#A2FAA3",
    poison: "#795663",
    ground: "#DA627D",
    steel: "#1D8A99",
    fighting: "#2F2F2F",
    fairy: "#DDB3E6",
    default: "#333",
}
