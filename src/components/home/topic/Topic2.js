import React from "react";
import './Topic2.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceTired } from "@fortawesome/free-solid-svg-icons";

const Topic2 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic2-bar">
                    <h1 id="topic2-title"><FontAwesomeIcon icon={faFaceTired} id="topic2-item"/>Căng thẳng & Kiệt quệ tinh thần</h1>
                </div>

                <div className="topic-posts">
                    <TopicContent />
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

export default Topic2;
