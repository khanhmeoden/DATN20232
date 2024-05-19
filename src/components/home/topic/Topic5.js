import React from "react";
import './Topic5.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const Topic5 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic5-bar">
                    <h1 id="topic5-title"><FontAwesomeIcon icon={faUserGroup} id="topic5-item"/>Các mối quan hệ bạn bè, gia đình, xã hội</h1>
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

export default Topic5;
