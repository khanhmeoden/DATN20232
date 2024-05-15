import React from "react";
import './Purpose4.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import PurposeContent from "./PurposeContent";

const Purpose4 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="purpose4-bar">
                    <h1 id="purpose4-title">Câu chuyện thường ngày & Tán gẫu</h1>
                </div>

                <div className="purpose-posts">
                    <PurposeContent />
                </div>
            </div>

            <div className="right-content">
                <div className="search">
                    <Search />
                </div>
                <div className="recent-activity">
                    <RecentActivity />
                </div>
            </div> 
        </div>            
    );
}

export default Purpose4;
