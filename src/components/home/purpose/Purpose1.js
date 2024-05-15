import React from "react";
import './Purpose1.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import PurposeContent from "./PurposeContent";

const Purpose1 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="purpose1-bar">
                    <h1 id="purpose1-title">Cần lời khuyên</h1>
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

export default Purpose1;
