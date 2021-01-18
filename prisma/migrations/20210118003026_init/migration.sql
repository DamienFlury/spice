-- CreateTable
CREATE TABLE "Recipe" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToRecipe_AB_unique" ON "_IngredientToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD FOREIGN KEY("A")REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD FOREIGN KEY("B")REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
