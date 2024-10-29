import { useState, useEffect } from "react";
import { Ability, AbilityData } from "../types";

const Abilities: React.FC<{ children: Ability[] }> = ({ children }) => {
  const [abilities, setAbilities] = useState<AbilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbility = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          children.map((child) =>
            fetch(child.ability.url).catch((err) => {
              console.error(`Error fetching ${child.ability.url}:`, err);
              return null; // Return null for failed fetches
            })
          )
        );

        const data = await Promise.all(
          responses.map(async (response) => {
            if (response && response.ok) {
              return response.json();
            }
            console.error(
              `Failed to fetch data: ${
                response ? response.status : "Network error"
              }`
            );
            return null; // Handle error case by returning null
          })
        );

        setAbilities(data.filter((item) => item !== null)); // Filter out null responses
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbility();
  }, [children]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const abilityRender = abilities.map((data) => {
    const abilityName = data.name;
    const effectEntry = data.effect_entries.find(
      (entry) => entry.language.name === "en"
    );
    const effectDescription = effectEntry
      ? effectEntry.short_effect
      : "No effect description available";

    return (
      <div className="common" key={abilityName}>
        <li>{abilityName}</li>
        <small>{effectDescription}</small>
      </div>
    );
  });

  return (
    <div className="common types abilities">
      <p>Abilities</p>
      <ul>{abilityRender}</ul>
    </div>
  );
};

export default Abilities;
