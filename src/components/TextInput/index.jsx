import "./styles.css";
export function TextIpunt({ searchValue, handleChange }) {
    return (
        <input
            className='text-input'
            value={searchValue}
            placeholder='type your search'
            onChange={handleChange}
            type='search'
        />
    );
}
