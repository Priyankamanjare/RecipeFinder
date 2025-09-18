import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const LOOKUP_API = import.meta.env.VITE_LOOKUP_API;

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`${LOOKUP_API}${id}`)
            .then((res) => {
                console.log(res)
                setRecipe(res.data.meals[0])
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id]);

    if (!recipe) return <p>Loading...</p>

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }


    return (
        <div className='p-6  text-slate-950 '>
            <Link to="/" className="text-blue-600 text-xs hover:underline mb-2 inline-block">&larr; Back</Link>

            <div className='border-2 border-slate-500 p-4 md:p-6'>
                <h1
                className='text-start text-3xl pb-2 recipe-title-caveat'
                style={{ fontFamily: "'Caveat Brush', cursive" }}
            >
                {recipe.strMeal}
            </h1>
            {/* Responsive layout: grid for md+, stack for sm */}

            <div className='w-full h-20 md:h-40 flex items-start gap-2 md:gap-12'>
                <div className=' h-20 md:h-40 flex items-center justify-start'>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal}
                    className=' h-full object-left-top object-contain' />
                    
                </div>

                <div className=" md:w-2/3 grid grid-rows-2 ">
                        <span  className="md:text-md text-xs text-slate-700">🕒30 minutes</span>
                        <span  className="md:text-md text-xs text-slate-700">🍴4 servings</span>
                    </div>
                
            </div>


            <div className='flex flex-col md:flex-row py-4'>
                {/* Ingredients */}
                <div className='md:mx-2.5'>
                    <h3
                        className='text-start text-xs md:text-md font-limelight'
                        style={{ fontFamily: "'Limelight', cursive" }}
                    >
                        Ingredients:
                    </h3>
                    <ul className='text-xs md:text-xs text-start py-2 list-disc list-inside'>
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                {/* Vertical divider only on md+ */}
                <div className="hidden md:block border-l-1 border-slate-500 mx-4"></div>
                {/* Instructions */}
                <div className='md:w-2/3 md:px-2 mt-4 md:mt-0'>
                    <h3
                        className='text-xs md:text-md text-start font-limelight'
                        style={{ fontFamily: "'Limelight', cursive" }}
                    >
                        Instructions:
                    </h3>
                    <p className='text-justify py-2 text-xs md:text-xs'>{recipe.strInstructions}</p>
                </div>
            </div>

            </div>
            
        </div>
    )
};

export default RecipeDetails
