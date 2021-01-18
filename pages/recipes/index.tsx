import { useQuery } from "react-query";
import { request } from "graphql-request";
import { Recipe, Ingredient } from "@prisma/client";
import RecipePreview from "../../components/RecipePreview";
import SEO from "../../components/SEO";
import AppBar from "../../components/AppBar";

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
  const { data } = useQuery("recipes", () =>
    request<{ recipes: (Recipe & { ingredients: Ingredient[] })[] }>(
      "/api/graphql",
      FETCH_ALL_RECIPES
    )
  );

  return (
    <>
      <AppBar />
      <div className="container mx-auto">
        <SEO title="Recipes | Spice" />
        {!data ? (
          <div>Loading</div>
        ) : (
          data.recipes.map((r) => <RecipePreview key={r.id} recipe={r} />)
        )}
      </div>
    </>
  );
};

export default Recipes;
