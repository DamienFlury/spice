import { ApolloServer, gql } from "apollo-server-micro";
import { PrismaClient, Recipe, Ingredient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    ingredients: [Ingredient!]!
  }
  type Ingredient {
    id: ID!
    title: String!
    recipes: [Recipe!]!
  }
  type Query {
    recipes: [Recipe!]!
    ingredients(contains: String, startsWith: String, take: Int): [Ingredient!]!
    recipe(id: ID!): Recipe!
  }
  type Mutation {
    createIngredient(title: String!, imageUrl: String!): Ingredient!
    createRecipe(
      title: String!
      description: String
      imageUrl: String!
      ingredients: [ID!]!
    ): Recipe!
    addIngredientToRecipe(ingredientId: ID!, recipeId: ID!): Recipe!
    removeIngredientFromRecipe(ingredientId: ID!, recipeId: ID!): Recipe!
    deleteRecipe(id: ID!): Recipe!
  }
`;

const resolvers = {
  Recipe: {
    ingredients: async (recipe: Recipe, _args: any, _context: any) => {
      const ingredients = await prisma.ingredient.findMany({
        where: {
          recipes: {
            some: {
              id: recipe.id,
            },
          },
        },
      });
      return ingredients;
    },
  },
  Ingredient: {
    recipes: async (ingredient: Ingredient, _args: any, _context: any) => {
      const recipes = await prisma.recipe.findMany({
        where: {
          ingredients: {
            some: {
              id: ingredient.id,
            },
          },
        },
      });
      return recipes;
    },
  },
  Query: {
    recipes: async (
      _parent: any,
      _args: any,
      _context: any
    ): Promise<Recipe[]> => {
      return prisma.recipe.findMany();
    },
    ingredients: async (
      _parent: any,
      {
        contains,
        startsWith,
        take,
      }: { contains?: string; startsWith?: string; take?: string },
      _context: any
    ): Promise<Ingredient[]> =>
      prisma.ingredient.findMany({
        where: {
          title: {
            contains,
            startsWith,
          },
        },
        take: take ? +take : undefined,
      }),
    recipe: async (_parent: any, { id }: { id: string }, _context: any) =>
      prisma.recipe.findUnique({
        where: {
          id: +id,
        },
      }),
  },
  Mutation: {
    createIngredient: async (
      _parent: any,
      { title, imageUrl }: { title: string; imageUrl: string },
      _context: any
    ): Promise<Ingredient> => {
      const ingredient = await prisma.ingredient.create({
        data: {
          title,
          imageUrl,
        },
      });
      return ingredient;
    },
    createRecipe: async (
      _parent: any,
      {
        title,
        description,
        imageUrl,
        ingredients,
      }: {
        title: string;
        description: string;
        imageUrl: string;
        ingredients: string[];
      },
      _context: any
    ): Promise<Recipe> => {
      const recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          imageUrl,
          ingredients: {
            connect: ingredients.map((id: string) => ({ id: +id })),
          },
        },
      });
      return recipe;
    },
    addIngredientToRecipe: async (
      _parent: any,
      { recipeId, ingredientId }: { recipeId: string; ingredientId: string },
      _context: any
    ): Promise<Recipe> => {
      return await prisma.recipe.update({
        where: {
          id: +recipeId,
        },
        data: {
          ingredients: {
            connect: {
              id: +ingredientId,
            },
          },
        },
      });
    },
    removeIngredientFromRecipe: (
      _parent: any,
      { recipeId, ingredientId }: { recipeId: string; ingredientId: string },
      _context: any
    ) =>
      prisma.recipe.update({
        where: {
          id: +recipeId,
        },
        data: {
          ingredients: {
            disconnect: {
              id: +ingredientId,
            },
          },
        },
      }),
    deleteRecipe: (_parent: any, { id }: { id: string }, _context: any) =>
      prisma.recipe.delete({
        where: {
          id: +id,
        },
      }),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
