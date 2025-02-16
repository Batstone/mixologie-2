interface DrinkCardProps {
  drinkName: string;
  glass: string;
  // ingredients: string[];
  instructions: string;
  // image: string;
  id: string;
}

export default function DrinkInstructions({ drinkName, glass, instructions }: DrinkCardProps) {
  return (
    <div>
      <h2>{drinkName}</h2>
      <div>
        <h3>Ingredients</h3>
        <ul></ul>
      </div>
      <div>
        <h3>Steps</h3>
        <p>{instructions}</p>
      </div>
    </div>
  );
}
