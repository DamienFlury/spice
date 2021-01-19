import { useQuery } from "react-query";
import { useRouter } from "next/router";
import request from "graphql-request";
import { Recipe } from "@prisma/client";
import SEO from "../../components/SEO";
import AppBar from "../../components/AppBar";

const FETCH_RECIPE_BY_ID = /* GraphQL */ `
    query RecipeById($id: ID!) {
        recipe(id: $id) {
            id
            title
            description
        }
    }
`;

const RecipeDetail = () => {
  const { query } = useRouter();
  const { data } = useQuery(["recipes", query.id], () =>
    request<{ recipe: Recipe }>("/api/graphql", FETCH_RECIPE_BY_ID, {
      id: +(query.id ?? 0),
    })
  );

  return (
    <>
      <SEO title={`Recipe ${query.id}`} />
      {!data ? (
        <div>Loading</div>
      ) : (
        <div>
          <h1>{data.recipe.title}</h1>
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
