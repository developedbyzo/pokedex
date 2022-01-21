import './App.css';
import { useState } from "react"
import axios from "axios"

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState([
    {
      name: "",
      type: "",
      img: "",
      dex_num: "",
      height: Number,
      weight: Number
    }
  ]);

  // Math conversions for pokemon data
  var inches = (pokemon.height * 3.94).toFixed(0);
  var feet = Math.floor(inches / 12);
  var leftover = inches % 12;
  var pounds = (pokemon.weight * 0.22046226218488).toFixed(1);


  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response) => {
      setPokemon({
        name: pokemonName.toUpperCase(),
        type: Response.data.types.map(type => type.type.name).join(" / ").toUpperCase(),
        img: Response.data.sprites.front_default,
        dex_num: Response.data.id,
        height: Response.data.height,
        weight: Response.data.weight
      });
      setPokemonChosen(true);
      console.log(setPokemon);
    });
  }

  return (

    <div className="App">
      <div className="title">
        <h1>PokeDex</h1>
        <div >
          <input id="pokeText" className="search" type="text" onChange={(event) => {
            setPokemonName(event.target.value)
          }} placeholder="Enter a Pokemon" />
          <div className="container">
            <div className="inner" onClick={searchPokemon}>
              <div className="inner-text">Submit</div>
            </div>
            <div className="inner-back"></div>
          </div>
        </div>
      </div>

      <div>
        {!pokemonChosen ? (
          <h1 style={{ paddingTop: "50px", fontFamily: "'Press Start 2P', cursive" }}>Click on the button to submit.</h1>
        ) : (
          <>
            <div className="flex-container">
              <div>
                <img className="imgLarge" src={pokemon.img} alt={"This is" + " " + pokemon.name} />
              </div>
              <div>
                <table>
                  <thead>
                    <tr>

                      <th className="info-spacing"> No. {pokemon.dex_num}</th>
                      <th className="info-spacing last-right">{pokemon.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="info-spacing">Type</th>
                      <th className="info-spacing last-right" id="colorType">{pokemon.type}</th>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <th className="last-right">{(feet + "'" + leftover + '"')}</th>
                    </tr>
                    <tr>
                      <th className="last">Weight</th>
                      <th className="last last-right">{(pounds + "lbs.")}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

}

export default App;
