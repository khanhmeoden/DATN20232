import React from "react";
import './Purpose3.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import PurposeContent from "./PurposeContent";

const Purpose3 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="purpose3-bar">
                    <h1 id="purpose3-title">Tâm sự và chia sẻ</h1>
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

export default Purpose3;
