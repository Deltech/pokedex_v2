import { ReactElement } from "react";
import { PokemonData } from "../types";
import "../Css/app.css";

export interface PokemonProps {
  children: PokemonData;
  handleHover: (e: React.MouseEvent<HTMLElement>) => void;
  handleReset: (e: React.MouseEvent<HTMLElement>) => void;
}

const Pokemon: React.FC<PokemonProps> = ({
  children,
  handleHover,
}): ReactElement => {
  const { name, sprites } = children;

  // Get the appropriate sprite with fallback handling
  const getPokemonSprite = (): string => {
    const dreamWorldSprite = sprites.other.dream_world.front_default;
    const officialArtwork = sprites.other["official-artwork"].front_default;

    return dreamWorldSprite || officialArtwork;
  };

  return (
    <div
      className="container pokemon--container box"
      onMouseEnter={handleHover}
    >
      <h3 className="unselectable">{name}</h3>
      <div className="container img--container unselectable">
        <img
          className="pokemon"
          src={getPokemonSprite()}
          alt={`image of ${name}`}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite error loop
            target.src = sprites.other["official-artwork"].front_default;
          }}
        />
      </div>
    </div>
  );
};

export default Pokemon;
