import { ColorType } from "./types.ts";

// Array of color types with their corresponding hex values or gradients

export const colorByType: ColorType[] = [
  { name: "normal", value: "#a4acaf" },
  {
    name: "flying",
    value: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
  },
  { name: "ghost", value: "#7b62a3" },
  { name: "steel", value: "#9eb7b8" },
  { name: "psychic", value: "#f366b9" },
  { name: "fairy", value: "#fdb9e9" },
  { name: "fighting", value: "#d56723" },
  { name: "fire", value: "#fd7d24" },
  {
    name: "dragon",
    value: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
  },
  { name: "electric", value: "#eed535" },
  { name: "poison", value: "#b97fc9" },
  {
    name: "ground",
    value: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
  },
  { name: "rock", value: "#a38c21" },
  { name: "bug", value: "#729f3f" },
  { name: "grass", value: "#9bcc50" },
  { name: "water", value: "#4592c4" },
  { name: "ice", value: "#51c4e7" },
  { name: "dark", value: "#6c6c6c" },
];
