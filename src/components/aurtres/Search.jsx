import { useRef, useState } from "react";

function Search({ placeholder, onTextChange }) {

    const input = useRef()

    const handleChange = (e) => {
        onTextChange && onTextChange(input.current.value)
    }

    return <div className="search">
        <input type="text" className="searCheInput" ref={input} onChange={handleChange} placeholder={placeholder} />
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="serach_items_content"></div>
    </div>
}

export default Search