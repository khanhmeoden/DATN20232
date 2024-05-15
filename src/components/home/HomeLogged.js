import React from "react";
import './HomeLogged.css';
import NavBar from "./NavBar.js";
import Topic from "./Topic.js";
import Purpose from "./Purpose.js";
import Search from "./Search.js";
import RecentPost from "./RecentPost.js";
import RecentActivity from "./RecentActivity.js";
// import Profile from "./Profile.js";

const HomeLogged = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <h1 id="page-title">Diễn đàn chia sẻ và hỗ trợ tâm lý</h1>
                <div className="topic">
                    <Topic />
                </div>
                <div className="purpose">
                    <Purpose />
                </div>
                <div className="recent-post">
                    <RecentPost />
                </div>
            </div>

            <div className="right-content">
                {/* <div className="user-info">
                    <Profile />
                </div> */}
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

export default HomeLogged;
