// components/Filter.tsx
import { useState, useEffect } from "react";

interface FilterProps {
  onFilter: (filters: {
    maxRentValue: number;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => void;
  units: Unit[];
}

interface Unit {
  address: string;
  number: string;
  unit: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  available: string;
  rentValue: string;
  condominium: string;
  waterTax: string;
  electricityTax: string;
  internetTax: string;
  imgUrl: string;
  renters: number[];
}

const Filter: React.FC<FilterProps> = ({ onFilter, units }) => {
  const [maxRentValue, setMaxRentValue] = useState<number | "">("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");

  // Listas dinâmicas
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<string[]>(
    []
  );
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);

  // Atualizar a lista de municípios com base no estado selecionado
  useEffect(() => {
    const uniqueCities = Array.from(
      new Set(
        units
          .filter((unit) => state === "" || unit.state === state) // Filtrar por estado
          .map((unit) => unit.city)
      )
    );
    setFilteredCities(uniqueCities);
    setCity(""); // Resetar o campo de cidade ao alterar o estado
    setNeighborhood(""); // Resetar o campo de bairro ao alterar o estado
    setAddress(""); // Resetar o campo de endereço ao alterar o estado
  }, [state, units]);

  // Atualizar a lista de bairros com base no município selecionado
  useEffect(() => {
    const uniqueNeighborhoods = Array.from(
      new Set(
        units
          .filter(
            (unit) =>
              (state === "" || unit.state === state) &&
              (city === "" || unit.city === city)
          ) // Filtrar por estado e cidade
          .map((unit) => unit.neighborhood)
      )
    );
    setFilteredNeighborhoods(uniqueNeighborhoods);
    setNeighborhood(""); // Resetar o campo de bairro ao alterar a cidade
    setAddress(""); // Resetar o campo de endereço ao alterar a cidade
  }, [city, state, units]);

  // Atualizar a lista de endereços com base no bairro e município selecionados
  useEffect(() => {
    const uniqueAddresses = Array.from(
      new Set(
        units
          .filter(
            (unit) =>
              (state === "" || unit.state === state) &&
              (city === "" || unit.city === city) &&
              (neighborhood === "" || unit.neighborhood === neighborhood) // Filtrar por estado, cidade e bairro
          )
          .map((unit) => unit.address)
      )
    );
    setFilteredAddresses(uniqueAddresses);
    setAddress(""); // Resetar o campo de endereço ao alterar o bairro
  }, [neighborhood, city, state, units]);

  const handleFilter = () => {
    onFilter({
      maxRentValue: maxRentValue !== "" ? Number(maxRentValue) : Infinity,
      address,
      neighborhood,
      city,
      state,
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded mb-6">
      {/* Ajuste de grid para responsividade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Campo de Valor Máximo do Aluguel */}
        <div>
          <label className="block text-gray-700">Valor Máximo do Aluguel</label>
          <input
            type="number"
            value={maxRentValue}
            onChange={(e) =>
              setMaxRentValue(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Campo de Estado */}
        <div>
          <label className="block text-gray-700">Estado</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Todos</option>
            {Array.from(new Set(units.map((unit) => unit.state))).map(
              (stateOption, index) => (
                <option key={index} value={stateOption}>
                  {stateOption}
                </option>
              )
            )}
          </select>
        </div>

        {/* Campo de Município */}
        <div>
          <label className="block text-gray-700">Município</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!state && state !== ""}
          >
            <option value="">Todos</option>
            {filteredCities.map((cityOption, index) => (
              <option key={index} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Bairro */}
        <div>
          <label className="block text-gray-700">Bairro</label>
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!city && city !== ""}
          >
            <option value="">Todos</option>
            {filteredNeighborhoods.map((neighborhoodOption, index) => (
              <option key={index} value={neighborhoodOption}>
                {neighborhoodOption}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Endereço */}
        <div>
          <label className="block text-gray-700">Endereço</label>
          <select
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            disabled={!neighborhood && neighborhood !== ""}
          >
            <option value="">Todos</option>
            {filteredAddresses.map((addressOption, index) => (
              <option key={index} value={addressOption}>
                {addressOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleFilter}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Filtrar
      </button>
    </div>
  );
};

export default Filter;
