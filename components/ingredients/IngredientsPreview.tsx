import { Ingredient } from "@prisma/client";
import Image from "next/image";

type Props = {
  ingredient: Ingredient;
};

const IngredientsPreview = ({ ingredient }: Props) => (
  <div className="mt-2 card">
    <h4 className="text-2xl">{ingredient.title}</h4>
    {ingredient.imageUrl && (
      <Image src={ingredient.imageUrl} width={300} height={300} />
    )}
  </div>
);

export default IngredientsPreview;
