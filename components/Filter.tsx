import React, { useState, useEffect, useMemo } from "react";
import { Unit } from "../types"; // Importando a interface Unit do arquivo types.ts

interface FilterProps {
  onFilter: (filters: {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => void;
  units: Unit[];
}

const Filter: React.FC<FilterProps> = React.memo(({ onFilter, units }) => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");

  const states = useMemo(() => {
    return Array.from(new Set(units.map((unit) => unit.state)));
  }, [units]);

  const cities = useMemo(() => {
    const filteredUnits = units.filter(
      (unit) => state === "" || unit.state === state
    );
    return Array.from(new Set(filteredUnits.map((unit) => unit.city)));
  }, [units, state]);

  const neighborhoods = useMemo(() => {
    const filteredUnits = units.filter(
      (unit) =>
        (state === "" || unit.state === state) &&
        (city === "" || unit.city === city)
    );
    return Array.from(new Set(filteredUnits.map((unit) => unit.neighborhood)));
  }, [units, state, city]);

  const addresses = useMemo(() => {
    const filteredUnits = units.filter(
      (unit) =>
        (state === "" || unit.state === state) &&
        (city === "" || unit.city === city) &&
        (neighborhood === "" || unit.neighborhood === neighborhood)
    );
    return Array.from(new Set(filteredUnits.map((unit) => unit.address)));
  }, [units, state, city, neighborhood]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilter({
        address,
        neighborhood,
        city,
        state,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [address, neighborhood, city, state, onFilter]);

  const handleStateChange = (value: string) => {
    setState(value);
    setCity("");
    setNeighborhood("");
    setAddress("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setNeighborhood("");
    setAddress("");
  };

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    setAddress("");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded mb-6 max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Estado</label>
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Todos</option>
            {states.map((stateOption, index) => (
              <option key={index} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Município</label>
          <select
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!state}
          >
            <option value="">Todos</option>
            {cities.map((cityOption, index) => (
              <option key={index} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Bairro</label>
          <select
            value={neighborhood}
            onChange={(e) => handleNeighborhoodChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!city}
          >
            <option value="">Todos</option>
            {neighborhoods.map((neighborhoodOption, index) => (
              <option key={index} value={neighborhoodOption}>
                {neighborhoodOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Endereço</label>
          <select
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!neighborhood}
          >
            <option value="">Todos</option>
            {addresses.map((addressOption, index) => (
              <option key={index} value={addressOption}>
                {addressOption}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});

export default Filter;
