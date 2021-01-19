import { Ingredient, Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import request from "graphql-request";
import { useQuery } from "react-query";
import AppBar from "../../components/AppBar";
import IngredientsPreview from "../../components/ingredients/IngredientsPreview";
import SEO from "../../components/SEO";

const FETCH_ALL_INGREDIENTS = /* GraphQL */ `
  query {
    ingredients {
      id
      title
      imageUrl
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
    <motion.div
      exit={{ opacity: 0 }}
      style={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto">
        <SEO title="Ingredients" />
        {!data ? (
          <div>Loading</div>
        ) : (
          data.ingredients.map((ingredient) => (
            <IngredientsPreview ingredient={ingredient} />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Ingredients;
