import Image from "next/image";
import styles from "./IngredientBurst.module.css";

type IngredientKind = "plain" | "ham" | "hungarian";

const ingredientImages: Record<IngredientKind, string> = {
  plain: "/ingredients/plain-real-v1.webp",
  ham: "/ingredients/ham-real-v1.webp",
  hungarian: "/ingredients/hungarian-real-v1.webp",
};

export function IngredientBurst({ kind }: { kind: IngredientKind }) {
  return (
    <div className={styles.burst} aria-hidden="true">
      <Image
        src={ingredientImages[kind]}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 767px) 90vw, 34vw"
        className={styles.ingredients}
      />
    </div>
  );
}
