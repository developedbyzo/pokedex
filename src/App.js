import './App.css';
import {useState} from "react"
import axios from "axios"

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState([
    {
    name:"".toUpperCase(),
    type: "",
    img: "",
    dex_num: "",
    height: Number,
    weight: Number
  }
]);

  var inches = (pokemon.height*3.94).toFixed(0);
  var feet = Math.floor(inches/12);
  var leftover = inches%12;
  var pounds = (pokemon.weight*0.22046226218488).toFixed(1);

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response)=> {
      setPokemon({
        name: pokemonName,
        type: Response.data.types.map(type => type.type.name).join(" | "),
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
      <div className="TitleSection">
        <h1>Pokemon App Title</h1>
      <input type="text" onChange={(event) => {
        setPokemonName(event.target.value)
      }} placeholder="Enter A Pokemon Name..."/>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      
      <div>
        {!pokemonChosen ? (
          <h1>Please select a Pokemon.</h1>
        ) : (
        <>
        <div>
          <img style={{backgroundColor: "red"}} src={pokemon.img}/>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>No. {pokemon.dex_num}</th>
                <th>{pokemon.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Type</th>
                <th>{pokemon.type}</th>
              </tr>
              <tr>
                <th>Height</th>
                <th>{(feet + "'" + leftover + '"')}</th>
              </tr>
              <tr>
                <th>Weight</th>
                <th>{(pounds + "lbs.")}</th>
              </tr>
              <tr>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
        </>
        
    
        )}
        
      </div>
    </div>
  );
}

export default App;
