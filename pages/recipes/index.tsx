import { useQuery } from "react-query";
import { request } from "graphql-request";
import { Recipe, Ingredient } from "@prisma/client";
import RecipePreview from "../../components/RecipePreview";
import SEO from "../../components/SEO";
import AppBar from "../../components/AppBar";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <motion.div
      exit={{ opacity: 0 }}
      style={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto">
        <SEO title="Recipes | Spice" />
        <Link href="/recipes/create">
          <a className="btn mt-4 inline-block">Create Recipe</a>
        </Link>
        {!data ? (
          <div>Loading</div>
        ) : (
          data.recipes.map((r) => <RecipePreview key={r.id} recipe={r} />)
        )}
      </div>
    </motion.div>
  );
};

export default Recipes;
