import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SEARCH_API = import.meta.env.VITE_SEARCH_API;
const LOOKUP_API = import.meta.env.VITE_LOOKUP_API;
import { Link } from 'react-router-dom';

const Home = () => {

    const [ingredient, setIngredient] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null)

    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);

        if (!ingredient) {
            setError("Please enter recipe name")
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`${SEARCH_API}${ingredient}`);
            if (!res.data.meals) {
                setRecipes([]);
                setError("Recipe not found");
            } else {
                setRecipes(res.data.meals);
            }
        } catch (error) {
            setError("Recipe not found");
            setRecipes([]);
        }
        setLoading(false);
    }

    const fetchRecipeDetails = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${LOOKUP_API}${id}`);
            if (res.data.meals && res.data.meals.length > 0) {
                setSelectedRecipe(res.data.meals[0]);
                console.log(res.data.meals[0]);
            } else {
                setError("Recipe details not found")
            }
        } catch (error) {
            setError("Recipe not found");
        }
        setLoading(false);
    }



    const showCentered = !loading && !error && recipes.length === 0;

    return (
        <div className={`flex flex-col items-center p-6 ${showCentered ? 'justify-center min-h-[70vh]' : ''}`}>
            <div className={`flex items-center justify-center mx-4 w-full px-8 ${showCentered ? '' : 'mt-4'}`}>
                <input type='text'
                    value={ingredient}
                    onChange={e => setIngredient(e.target.value)}
                    placeholder='Enter Recipe name'
                    className='text-slate-400 py-2 mr-1 text-sm text-center border-2 border-yellow-300 shadow-lg focus:border-yellow-400 focus:bg-yellow-50 focus:outline-none'
                />
                <button onClick={fetchRecipes}
                    className=' text-neutral-400 border-2 border-yellow-300 p-2 text-sm shadow-lg'>
                    Search
                </button>
            </div>


            {loading && <p className='text-neutral-400'>Loading...</p>}
            {error && <p className='text-red-600 py-20'>{error}...</p>}

            <div className='grid grid-cols-2 md:grid-cols-4 text-center '>
                {recipes.map(recipe => (
                    <div key={recipe.idMeal} className='card border-2 border-slate-500 m-2'>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal}
                            className=' object-contain' />
                        <h4 className='text-slate-600 text-sm'>{recipe.strMeal}</h4>
                        <Link to={`/recipes/${recipe.idMeal}`}>
                            <button className='text-blue-500 text-xs'>View More</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
