import { useId } from "react";
import { PokemonTypes, Abilities, Graph, Weaknesses } from "./index.ts";
import { PokemonData } from "../types";
import "../Css/card.css";

export interface ModalProps {
  children: PokemonData;
  handleReset: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ children, handleReset }) => {
  return (
    <div className="container modal box-modal">
      <h3 className="common name">{children.name}</h3>
      <h3 className="common rank">#{children.id}</h3>
      <button onClick={handleReset}>X</button>
      <img
        src={
          children.sprites.other.dream_world.front_default ||
          children.sprites.other["official-artwork"].front_default
        }
        alt={`image of ${children.name}`}
      />
      <div className="common types types">
        <p>Types</p>
        <PokemonTypes key={useId()}>{children.types}</PokemonTypes>
      </div>
      <Abilities key={useId()}>{children.abilities}</Abilities>
      <div className="common types weaknesses">
        <p>Weaknesses</p>
        <Weaknesses key={useId()}>{children.types}</Weaknesses>
      </div>
      <Graph key={useId()} statsToDisplay={5}>
        {children.stats}
      </Graph>
    </div>
  );
};

export default Modal;
