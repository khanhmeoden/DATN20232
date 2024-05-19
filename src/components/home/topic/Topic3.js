import React from "react";
import './Topic3.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

const Topic3 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic3-bar">
                    <h1 id="topic3-title"><FontAwesomeIcon icon={faFaceFrown} id="topic3-item"/>Trầm cảm & Lo lắng</h1>
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

export default Topic3;
