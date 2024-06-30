import styled from "styled-components";

const FilterContainer = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-left: auto;
`;

const FilterElement = styled.div`
    display: grid;
    text-align: center;
    gap: 5px;
    font-size: 1.0rem;
`;

const Filter = ({ onFilterChange, options }) => (
    <select onChange={e => onFilterChange(e.target.value)} style={{color: 'black', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <option value="all">Todos</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  export { Filter, FilterContainer, FilterElement };