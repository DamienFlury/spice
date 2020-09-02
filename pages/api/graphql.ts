import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient, Recipe, Ingredient } from '@prisma/client';

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
  }
`;

const resolvers = {
  Recipe: {
    ingredients: async (recipe: Recipe, _args, _context) => {
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
    recipes: async (ingredient: Ingredient, _args, _context) => {
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
    recipes: async (_parent, _args, _context): Promise<Recipe[]> => {
      return prisma.recipe.findMany();
    },
    ingredients: async (
      _parent,
      { contains, startsWith, take },
      _context
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
  },
  Mutation: {
    createIngredient: async (
      _parent,
      { title, imageUrl },
      _context
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
      _parent,
      { title, description, imageUrl, ingredients },
      _context
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
      _parent,
      { recipeId, ingredientId },
      _context
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
      _parent,
      { recipeId, ingredientId },
      _context
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
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
