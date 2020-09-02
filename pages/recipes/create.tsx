import { useState, useEffect, useReducer } from 'react';
import { useQuery, usePaginatedQuery, useMutation } from 'react-query';
import request from 'graphql-request';
import { Ingredient, Action } from '@prisma/client';
import IngredientsList from '../../components/IngredientsList';
import SEO from '../../components/SEO';
import TextField from '../../components/TextField';
import AppBar from '../../components/AppBar';

const SEARCH_INGREDIENTS = /* GraphQL */ `
  query($startsWith: String) {
    ingredients(startsWith: $startsWith, take: 3) {
      id
      title
    }
  }
`;

const CREATE_RECIPE = /* GraphQL */ `
  mutation CreateRecipe(
    $title: String!
    $description: String!
    $imageUrl: String!
    $ingredients: [ID!]!
  ) {
    createRecipe(
      title: $title
      description: $description
      imageUrl: $imageUrl
      ingredients: $ingredients
    ) {
      id
      title
    }
  }
`;

type IngredientAction =
  | { type: 'add'; ingredient: Ingredient }
  | { type: 'remove'; id: number };

const ingredientsReducer = (
  state: Ingredient[],
  action: IngredientAction
): Ingredient[] => {
  switch (action.type) {
    case 'add':
      if (state.some((i) => i.id === action.ingredient.id)) {
        return state;
      }
      return [...state, action.ingredient];
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    default:
      return state;
  }
};

const RecipeCreator: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { resolvedData } = usePaginatedQuery(
    ['ingredients', searchText],
    () =>
      request<{ ingredients: Ingredient[] }>(
        '/api/graphql',
        SEARCH_INGREDIENTS,
        {
          startsWith: searchText,
        }
      ),
    {
      enabled: searchText !== '',
    }
  );

  const [mutate] = useMutation(() =>
    request('/api/graphql', CREATE_RECIPE, {
      title,
      description,
      imageUrl,
      ingredients: selectedIngredients.map((i) => i.id),
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const [selectedIngredients, dispatch] = useReducer(ingredientsReducer, []);

  return (
    <>
      <AppBar />
      <div className="container mx-auto rounded shadow p-4 my-4">
        <SEO title="Create Recipe | Spice" />
        <h2 className="text-4xl mb-4">Create Recipe</h2>
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="my-4">
            <TextField
              id="title"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="my-2">
              <TextField
                id="description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                multiline
              />
            </div>
            <TextField
              id="image"
              label="Image"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </div>
          <div className="">
            <h4 className="text-2xl mt-4 mb-2">Ingredients</h4>
            <TextField
              label="Search"
              id="search-text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText !== '' &&
              resolvedData?.ingredients.map((i) => (
                <button
                  className="p-4 w-full text-left"
                  key={i.id}
                  onClick={() => {
                    dispatch({ type: 'add', ingredient: i });
                    setSearchText('');
                  }}
                  type="button"
                >
                  {i.title}
                </button>
              ))}
          </div>
          <IngredientsList
            ingredients={selectedIngredients}
            onRemove={(id) => {
              dispatch({ type: 'remove', id });
            }}
          />
          <button
            type="submit"
            className="bg-primary py-2 px-4 rounded text-white mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RecipeCreator;
