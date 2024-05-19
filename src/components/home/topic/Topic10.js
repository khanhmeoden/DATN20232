import React from "react";
import './Topic10.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceDizzy } from "@fortawesome/free-solid-svg-icons";

const Topic10 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic10-bar">
                    <h1 id="topic10-title"><FontAwesomeIcon icon={faFaceDizzy} id="topic10-item"/>Tự tử & Tự làm hại bản thân</h1>
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

export default Topic10;
