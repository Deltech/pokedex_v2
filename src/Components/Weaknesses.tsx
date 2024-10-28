import { useState, useEffect } from "react";
import { colorByType } from "./utils";
import { PokemonType, ColorType, TypeApiResponse } from "./types.ts";
import "../Css/card.css";

interface WeaknessesProps {
  children: PokemonType[];
}

const Weaknesses: React.FC<WeaknessesProps> = ({ children }) => {
  const [typeData, setTypeData] = useState<TypeApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          children.map((child) =>
            fetch(child.type.url).catch((err) => {
              console.error(`Error fetching ${child.type.url}:`, err);
              return null;
            })
          )
        );

        const data = await Promise.all(
          responses.map(async (response) => {
            if (response && response.ok) {
              return response.json() as Promise<TypeApiResponse>;
            }
            console.error(
              `Failed to fetch data: ${
                response ? response.status : "Network error"
              }`
            );
            return null;
          })
        );

        setTypeData(
          data.filter((item): item is TypeApiResponse => item !== null)
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, [children]);

  if (isLoading) {
    return <div className="loading">Loading weaknesses...</div>;
  }

  if (error) {
    return <div className="error">Error loading weaknesses: {error}</div>;
  }

  const renderWeaknesses = () => {
    const uniqueWeaknesses = new Set<string>();

    const weaknesses = typeData.flatMap((type) =>
      type.damage_relations.double_damage_from
        .filter((weakness) => !uniqueWeaknesses.has(weakness.name))
        .map((weakness) => {
          uniqueWeaknesses.add(weakness.name);
          const color =
            colorByType.find(
              (typeColor: ColorType) => typeColor.name === weakness.name
            )?.value || "#000000";

          return (
            <li
              key={weakness.name}
              style={{ backgroundColor: color }}
              className="weakness-item"
            >
              {weakness.name}
            </li>
          );
        })
    );

    return weaknesses.length > 0 ? (
      weaknesses
    ) : (
      <li className="no-weaknesses">No weaknesses found</li>
    );
  };

  return <ul className="weaknesses-list">{renderWeaknesses()}</ul>;
};

export default Weaknesses;
