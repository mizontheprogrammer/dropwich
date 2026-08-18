export type ProductId = "plain" | "ham" | "hungarian";

export type Product = {
  id: ProductId;
  number: string;
  name: string;
  label: string;
  short: string;
  description: string;
  price: number;
  cost: number;
  tone: string;
  image: string;
};

export const products: Product[] = [
  { id: "plain", number: "01", name: "Egguls tayo, lods", label: "Plain Dropwich", short: "The original", description: "Creamy folded egg, melted cheese, and house sauce in buttery toasted bread.", price: 89, cost: 72.93, tone: "sun", image: "/products/plain.png" },
  { id: "ham", number: "02", name: "LaHam mo ba ako?", label: "Ham Dropwich", short: "The crowd pick", description: "The original stack, made fuller with savory ham and extra cheesy comfort.", price: 104, cost: 82.17, tone: "coral", image: "/products/ham.png" },
  { id: "hungarian", number: "03", name: "Hanggang kailan ako aasa?", label: "Hungarian Dropwich", short: "The big bite", description: "Creamy egg and cheese meet smoky Hungarian sausage for the biggest bite.", price: 114, cost: 86.5, tone: "sage", image: "/products/hungarian.png" },
];

export const formatPeso = (value: number) => new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: value % 1 ? 2 : 0,
}).format(value);
