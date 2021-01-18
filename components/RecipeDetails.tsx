import { Recipe, Ingredient } from '@prisma/client';
import AppBar from './AppBar';

type Props = {
  recipe: Recipe & { ingredients: Ingredient[] };
};

const maxLines = 9;

const RecipeDetails: React.FC<Props> = ({ recipe }) => (
  <div className="card my-4">
    <h3 className="text-3xl">{recipe.title}</h3>
    <div className="flex">
      <div
        className="w-64 h-64 rounded"
        style={{
          backgroundImage: `url(${recipe.imageUrl})`,
          backgroundSize: 'cover',
        }}
      />
      <ul className="ml-8 text-gray-800 list-disc h-64">
        {recipe.ingredients.slice(0, maxLines).map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
        {recipe.ingredients.length > maxLines && <li>...</li>}
      </ul>
    </div>
    <button className="rounded px-4 py-2 bg-gray-200 mt-2">Check it out</button>
  </div>
);

export default RecipeDetails;
