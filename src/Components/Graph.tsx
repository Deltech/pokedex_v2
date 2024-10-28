import { useId } from "react";
import { Stat } from "./types.ts";

export interface GraphProps {
  children: Stat[];
  statsToDisplay: number;
}

const Graph: React.FC<GraphProps> = ({ children, statsToDisplay }) => {
  const statsAbbreviation: Record<string, string> = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "s.atk",
    "special-defense": "s.def",
    speed: "speed",
  };

  const renderStatBar = (statStrength: number) => (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <li
          key={i}
          style={{
            background: statStrength >= i + 1 ? "rgb(56, 175, 249)" : undefined,
          }}
        />
      ))}
    </>
  );

  return (
    <div className="stats--container unselectable">
      {Array.isArray(children) &&
        children.slice(0, statsToDisplay).map((stat: any) => {
          const statStrength = stat.base_stat / 20;
          const statAbbr = statsAbbreviation[stat.stat.name] || "N/A";
          const containerId = useId();

          return (
            <ul key={containerId} className="container">
              <span>{statAbbr}</span>
              {renderStatBar(statStrength)}
            </ul>
          );
        })}
    </div>
  );
};

export default Graph;
