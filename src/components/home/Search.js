import { React, useState } from "react";
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Thực hiện tìm kiếm ở đây, sử dụng biến searchTerm
        alert("Đã tìm kiếm: " + searchTerm);
    };
    
    return (
        <div>
            <h3 className="search-title">Tìm kiếm</h3>
            <div className="search-box">
                <form id="search-form">
                    <label className="search-widget">
                        <input type="text" placeholder="Nhập từ khoá tìm kiếm..." className="search-input" 
                             value={searchTerm} onChange={handleInputChange}
                        required/>
                    </label>
                </form>
                <button type="button" onClick={handleSearch} className="search-button"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
        </div>
    )
}

export default Search