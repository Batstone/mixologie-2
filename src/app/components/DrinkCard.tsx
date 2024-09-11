interface DrinkCardProps {
  drinkName: string;
}

export default function DrinkCard({ drinkName }: DrinkCardProps) {
  return (
    <div>
      <h2>{drinkName}</h2>
    </div>
  );
}
