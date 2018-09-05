const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

/*********************************************************TO-DO LIST OF DOOOOM

show all users and their pokemon (grab from database and display)
  fetch something
  parse it into readable data
  create display
    make 'cards' (trainer card)
      "add pokemon" button
    make <il's>,<li>'s, etc.
    make individual pokemon <div>'s
      those god damn buttons (delete individual pokemon)

profit

*****************************************************************************/
function createTrainerCards(data){
  console.log(`YOU MADE IT + ${data}`);

  for(let trainer of data){
    const trainerName = trainer.name;
    const trainerId = trainer.id;
    const trainerPokemons = trainer.pokemons;

    let newTrainerCard = trainerCardTemplate({trainerName, trainerId, trainerPokemons})
    const main = document.querySelector("main");
    main.innerHTML += newTrainerCard;
  //================================================ POKEMONS HERE
  const trainerUl = document.getElementById(trainerId).getElementsByTagName("ul");

  // const trainerUl = document.getAttribute("data-id").getElementsByTagName("ul");
  // We cheesed it and just gave the div an id to identify instead of using the
  // data-id tag. COME BACK HERE AND LEARN TO DO IT RIGHT! :D

  for(let pokemon of trainerPokemons){
    const pokemonId = pokemon.id;
    const pokemonName = pokemon.nickname;
    const pokemonSpecies = pokemon.species;
    const pokemonTrainerId = pokemon.trainer_id;

    let newPokemonListItem = pokemonListTemplate({pokemonId, pokemonName, pokemonSpecies, pokemonTrainerId});
    console.log(trainerUl, pokemonTrainerId);
    trainerUl[0].innerHTML += newPokemonListItem;
  }//for (pokemon)

    //debugger;
    // WE HAVE THE DATA. NOW WE MAKE FORMS N SHIT.
    // 1 make trainer card
    // add list of pokemon
  }//for (trainer)

}//createTrainerCards()
function pokemonListTemplate({pokemonId, pokemonName, pokemonSpecies, pokemonTrainerId}){
  return `
    <li>${pokemonName} (${pokemonSpecies}) <button class="release" data-pokemon-id="${pokemonId}">Release</button></li>
  `;
}//pokemonListTemplate

function trainerCardTemplate ({trainerName, trainerId, trainerPokemons}) {
  return `
    <div class="card" data-id="${trainerId}" id="${trainerId}"><p>${trainerName}</p>
    <button data-trainer-id="${trainerId}">Add Pokemon</button>

    <ul>
    </ul>

    </div>
  `;
}//trainerCardTemplate

//================= FETCH =========================
fetch(TRAINERS_URL)
  .then(data => data.json())
  .then(trainerData => createTrainerCards(trainerData))
