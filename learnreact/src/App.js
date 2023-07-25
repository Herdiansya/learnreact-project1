import React, { useEffect, useState } from "react";
import Recipes from "./recipe";
import "./App.css";

function App() {
  const APP_ID = "157a757c";
  const APP_KEY = "2419f97ef598f749bfd41da7203297c8";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="app">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipes key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} images={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;
