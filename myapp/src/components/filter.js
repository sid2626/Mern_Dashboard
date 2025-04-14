import React from 'react';
import Select from 'react-select';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (selected, field) => {
    setFilters({ ...filters, [field]: selected ? selected.value : "" });
  };

  // Options for filters
  const filterOptions = {
    end_year: [{ value: "2025", label: "2025" }, { value: "2030", label: "2030" }],
    topics: [{ value: "AI", label: "AI" }, { value: "Climate", label: "Climate" }],
    sector: [{ value: "Technology", label: "Technology" }, { value: "Energy", label: "Energy" }],
    region: [{ value: "Asia", label: "Asia" }, { value: "Europe", label: "Europe" }],
    pest: [{ value: "Political", label: "Political" }, { value: "Economic", label: "Economic" }],
    source: [{ value: "Reuters", label: "Reuters" }, { value: "BBC", label: "BBC" }],
    swot: [{ value: "Strength", label: "Strength" }, { value: "Weakness", label: "Weakness" }],
    country: [{ value: "USA", label: "USA" }, { value: "India", label: "India" }],
    city: [{ value: "New York", label: "New York" }, { value: "Mumbai", label: "Mumbai" }]
  };

  return (
    <div className="filters">
      {Object.keys(filterOptions).map((field) => (
        <div key={field} className="filter">
          <label>{field.replace("_", " ").toUpperCase()}:</label>
          <Select
            options={filterOptions[field]}
            onChange={(selected) => handleChange(selected, field)}
            isClearable
          />
        </div>
      ))}
    </div>
  );
};

export default Filters;
