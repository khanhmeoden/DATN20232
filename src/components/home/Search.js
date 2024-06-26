import React, { useState } from "react";
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (!searchTerm) {
            alert('Vui lòng nhập từ khóa tìm kiếm');
            return;
        }
        // Điều hướng đến trang kết quả tìm kiếm với state
        navigate('/search-results', { state: { keyword: searchTerm } });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSearch();
        }
    };

    return (
        <div>
            <h3 className="search-title">Tìm kiếm</h3>
            <div className="search-box">
                <form id="search-form">
                <label htmlFor="search-input" className="search-widget">
                    <input 
                        type="text"
                        id="search-input" 
                        placeholder="Nhập từ khóa tìm kiếm..." 
                        className="search-input" 
                        value={searchTerm} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown} 
                        required 
                    />
                </label>
                </form>
                <button type="button" onClick={handleSearch} className="search-button"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
        </div>
    );
};

export default Search;
