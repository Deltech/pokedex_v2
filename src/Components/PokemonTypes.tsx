import { useId } from "react";
import { colorByType } from "./utils.ts";
import { ColorType, PokemonType } from "../types";
import "../Css/card.css";

export interface TypesProps {
  children: PokemonType[];
}

const PokemonTypes: React.FC<TypesProps> = ({ children }) => {
  const types = children.map((type) => {
    const color: string =
      colorByType.find((color: ColorType) => color.name === type.type.name)
        ?.value || "#000000";

    return (
      <li key={useId()} style={{ background: color }} className="type-item">
        {type.type.name}
      </li>
    );
  });

  return (
    <div className="types unselectable">
      <ul>{types}</ul>
    </div>
  );
};

export default PokemonTypes;
