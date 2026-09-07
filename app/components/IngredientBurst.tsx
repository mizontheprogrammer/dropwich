import styles from "./IngredientBurst.module.css";

type IngredientKind = "plain" | "ham" | "hungarian";
type IngredientShape = "egg" | "cheese" | "sauce" | "ham" | "sausage";

const ingredientSets: Record<IngredientKind, IngredientShape[]> = {
  plain: ["egg", "cheese", "sauce", "egg"],
  ham: ["ham", "egg", "cheese", "ham"],
  hungarian: ["sausage", "cheese", "egg", "sausage"],
};

const variantClasses: Record<IngredientKind, string> = {
  plain: "",
  ham: styles.variantHam,
  hungarian: styles.variantHungarian,
};

export function IngredientBurst({ kind }: { kind: IngredientKind }) {
  return (
    <div
      className={`${styles.burst} ${variantClasses[kind]}`}
      aria-hidden="true"
    >
      {ingredientSets[kind].map((shape, index) => (
        <span
          className={`${styles.piece} ${styles[`piece${index + 1}`]} ${styles[shape]}`}
          key={`${shape}-${index}`}
        />
      ))}
    </div>
  );
}
