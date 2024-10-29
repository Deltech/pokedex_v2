import { useState, useEffect } from "react";
import { Pokemon, Overview, Modal, fetchData } from "./index.ts";
import { PokemonData, PokemonDisplay } from "../types";
import "../Css/card.css";

interface RenderPokemonProps {
  pokemonDisplay: PokemonDisplay;
}

const RenderPokemon: React.FC<RenderPokemonProps> = ({ pokemonDisplay }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData({ pokemonDisplay, setPokemonData });
    };
    fetchDataAsync();
  }, [pokemonDisplay]);

  function handleHover(e: React.MouseEvent<HTMLElement>): void {
    const target = (e.target as HTMLElement).children[0]?.textContent;
    if (!target) return;

    setPokemonData((prevPokemonData) => {
      return prevPokemonData.map((pokemon) =>
        target === pokemon.name
          ? pokemon.isOverviewOpen
            ? { ...pokemon, isModalOpen: !pokemon.isModalOpen }
            : { ...pokemon, isOverviewOpen: !pokemon.isOverviewOpen }
          : pokemon
      );
    });
  }

  function handleReset(e: React.MouseEvent<HTMLElement>): void {
    const target =
      (e.target as HTMLElement).parentElement?.children[0]?.textContent || "";
    const targetTwo = (e.target as HTMLElement).textContent || "";

    if (target || targetTwo) {
      setPokemonData((prevPokemonData: any) => {
        const updatedData = prevPokemonData.map((pokemon: any) => {
          if (target || targetTwo === pokemon.name) {
            return { ...pokemon, isModalOpen: false, isOverviewOpen: false };
          }
          return pokemon;
        });
        return updatedData;
      });
    }
  }

  const renderPokemonCard = (pokemon: PokemonData) => {
    if (pokemon.isModalOpen) {
      return (
        <Modal key={pokemon.id} handleReset={handleReset}>
          {pokemon}
        </Modal>
      );
    }

    if (pokemon.isOverviewOpen) {
      return (
        <Overview
          key={pokemon.id}
          handleHover={handleHover}
          handleReset={handleReset}
        >
          {pokemon}
        </Overview>
      );
    }

    return (
      <Pokemon
        key={pokemon.id}
        handleHover={handleHover}
        handleReset={handleReset}
      >
        {pokemon}
      </Pokemon>
    );
  };

  return <div className="render">{pokemonData.map(renderPokemonCard)}</div>;
};

export default RenderPokemon;
