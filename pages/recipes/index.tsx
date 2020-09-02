import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { Recipe, Ingredient } from '@prisma/client';
import RecipeDetails from '../../components/RecipeDetails';
import SEO from '../../components/SEO';
import AppBar from '../../components/AppBar';

const FETCH_ALL_RECIPES = /* GraphQL */ `
  query {
    recipes {
      id
      title
      imageUrl
      description
      ingredients {
        id
        title
      }
    }
  }
`;

const Recipes: React.FC = () => {
  const { data } = useQuery('recipes', () =>
    request<{ recipes: (Recipe & { ingredients: Ingredient[] })[] }>(
      '/api/graphql',
      FETCH_ALL_RECIPES
    )
  );

  if (!data) {
    return <div>Loading</div>;
  }
  return (
    <>
      <AppBar />
      <div className="container mx-auto">
        <SEO title="Recipes | Spice" />
        {data.recipes.map((r) => (
          <RecipeDetails key={r.id} recipe={r} />
        ))}
      </div>
    </>
  );
};

export default Recipes;
