import { Ingredient } from '@prisma/client';

type Props = {
  ingredients: Ingredient[];
  onRemove?: (id: number) => void;
};

const IngredientsList: React.FC<Props> = ({ ingredients, onRemove }) => (
  <div className="rounded shadow-lg">
    {ingredients.map((i) => (
      <div key={i.id} className="p-4 flex">
        {i.title}
        <div className="flex-1" />
        <button className="text-red-400" onClick={() => onRemove(i.id)}>
          REMOVE
        </button>
      </div>
    ))}
  </div>
);

export default IngredientsList;
