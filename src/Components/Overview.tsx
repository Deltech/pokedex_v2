import { useId } from "react";
import { PokemonTypes, Graph } from "./index.ts";
import { PokemonData } from "../types";
import "../Css/card.css";

export interface OverviewProps {
  children: PokemonData;
  handleHover: (e: React.MouseEvent<HTMLElement>) => void;
  handleReset: (e: React.MouseEvent<HTMLElement>) => void;
}

const Overview: React.FC<OverviewProps> = ({
  children,
  handleHover,
  handleReset,
}) => {
  const uniqueTypesId = useId();
  const uniqueGraphId = useId();

  // Separate handler for container click
  const handleContainerClick = (e: React.MouseEvent<HTMLElement>) => {
    // Stop event from bubbling up to parent elements
    e.stopPropagation();
    handleHover(e);
  };

  // Separate handler for mouse leave
  const handleContainerLeave = (e: React.MouseEvent<HTMLElement>) => {
    // Stop event from bubbling up to parent elements
    e.stopPropagation();
    handleReset(e);
  };

  // Prevent button click from triggering container events
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="container pokemon--container box"
      onClick={handleContainerClick}
      onMouseLeave={handleContainerLeave}
    >
      <h3 className="unselectable">{children.name}</h3>

      <PokemonTypes key={uniqueTypesId}>{children.types}</PokemonTypes>

      <Graph statsToDisplay={3} key={uniqueGraphId}>
        {children.stats}
      </Graph>

      <button
        className="info--button unselectable"
        onClick={handleButtonClick}
        aria-label="Show more information"
      >
        <p className="unselectable">More</p>
      </button>
    </div>
  );
};

export default Overview;
