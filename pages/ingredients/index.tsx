import { Ingredient, Recipe } from "@prisma/client";
import request from "graphql-request";
import { useQuery } from "react-query";
import AppBar from "../../components/AppBar";
import SEO from "../../components/SEO";

const FETCH_ALL_INGREDIENTS = /* GraphQL */ `
  query {
    ingredients {
      id
      title
    }
  }
`;

const Ingredients = () => {
  const { data } = useQuery("ingredients", () =>
    request<{ ingredients: Ingredient[] }>(
      "/api/graphql",
      FETCH_ALL_INGREDIENTS
    )
  );
  return (
    <>
      <SEO title="Ingredients" />
      <AppBar />
      Ingredients
      {!data ? (
        <div>Loading</div>
      ) : (
        data.ingredients.map((ingredient) => <div>{ingredient.title}</div>)
      )}
    </>
  );
};

export default Ingredients;
