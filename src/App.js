import './App.css';
import {useState} from "react"
import axios from "axios"

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState([
    {
    name:"",
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

  // const colors = () => {
  //   if (document.getElementById('colorType').textContent === 'normal') {
  //     document.getElementById('colorType').style.color = "gray"
  //   } else if (document.getElementById('colorType').innerText === 'fire') {
  //     document.getElementById('colorType').style.color = 'orange'
  //   } else if (document.getElementById('colorType').innerText === 'water') {
  //     document.getElementById('colorType').style.color = 'blue'
  //   } else if (document.getElementById('colorType').innerText === 'grass') {
  //     document.getElementById('colorType').style.color = 'green'
  //   } else if (document.getElementById('colorType').innerText === 'electric') {
  //     document.getElementById('colorType').style.color = 'yellow'
  //   } else if (document.getElementById('colorType').innerText === 'ice') {
  //     document.getElementById('colorType').style.color = 'light blue'
  //   } else if (document.getElementById('colorType').innerText === 'fighting') {
  //     document.getElementById('colorType').style.color = 'red'
  //   } else if (document.getElementById('colorType').innerText === 'poison') {
  //     document.getElementById('colorType').style.color = ' light purple'
  //   } else if (document.getElementById('colorType').innerText === 'ground') {
  //     document.getElementById('colorType').style.color = 'tan'
  //   } else if (document.getElementById('colorType').innerText === 'flying') {
  //     document.getElementById('colorType').style.color = 'sky blue'
  //   } else if (document.getElementById('colorType').innerText === 'psychic') {
  //     document.getElementById('colorType').style.color = 'pink'
  //   } else if (document.getElementById('colorType').innerText === 'bug') {
  //     document.getElementById('colorType').style.color = 'light green'
  //   } else if (document.getElementById('colorType').innerText === 'rock') {
  //     document.getElementById('colorType').style.color = 'light brown'
  //   } else if (document.getElementById('colorType').innerText === 'ghost') {
  //     document.getElementById('colorType').style.color = 'dark purple'
  //   } else if (document.getElementById('colorType').innerText === 'dark') {
  //     document.getElementById('colorType').style.color = 'dark brown'
  //   } else if (document.getElementById('colorType').innerText === 'dragon') {
  //     document.getElementById('colorType').style.color = 'purple'
  //   } else if (document.getElementById('colorType').innerText === 'steel') {
  //     document.getElementById('colorType').style.color = 'silver'
  //   } else if (document.getElementById('colorType').innerText === 'fairy') {
  //     document.getElementById('colorType').style.color = 'light pink'
  //   }
  // };


  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response)=> {
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
      <input type="text" onChange={(event) => {
        setPokemonName(event.target.value)
      }} placeholder="Enter A Pokemon Name..."/>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      
      <div>
        {!pokemonChosen ? (
          <h1 style={{paddingTop: "10px"}}>Please select a Pokemon.</h1>
        ) : (
        <>
        <div className="flex-container">
        <div>
          <img className="imgLarge" src={pokemon.img} alt={"This is"+" "+ pokemon.name}/>
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
