import React from "react";
import './Topic.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faWineBottle, faFaceTired, faFaceFrown, faFaceSadTear, faUserGroup, faHeart, faSackDollar, faBaby, faSchool, faFaceDizzy, faVenusMars, faBurger, faNotesMedical, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Topic = () => {
    return (
                <div className="topic-table">
                    <div className="wpforo-category">
                        <div className="wpforo-cat-panel">
                            <div className="cat-title" title="">
                                <span className="cat-icon">
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                </span>
                                <span className="cat-name">CÁC CHỦ ĐỀ THẢO LUẬN</span>
                            </div>
                        </div>
                    </div>

                    <div className="forum-topic">
                        <div className="forum-topic-list">   
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item1" icon={faWineBottle} />
                                </span>
                                <a href="/topic1">Lạm dụng, nghiện các chất</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item2" icon={faFaceTired} />
                                </span>
                                <a href="/topic2">Căng thẳng & Kiệt quệ tinh thần</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item3" icon={faFaceFrown} />
                                </span>
                                <a href="/topic3">Trầm cảm & Lo lắng</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item4" icon={faFaceSadTear} />
                                </span>
                                <a href="/topic4">Đau buồn & Mất mát</a>   
                            </div>                            

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item5" icon={faUserGroup} />
                                </span>
                                <a href="/topic5">Các mối quan hệ bạn bè, gia đình, xã hội</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item6" icon={faHeart} />
                                </span>
                                <a href="/topic6">Độc thân & Các mối quan hệ tình cảm</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item7" icon={faSackDollar} />
                                </span>
                                <a href="/topic7">Công việc, tiền bạc, tài chính</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item8" icon={faBaby} />
                                </span>
                                <a href="/topic8">Trẻ em và trẻ vị thành niên</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item9" icon={faSchool} />
                                </span>
                                <a href="/topic9">Trường học và học tập</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item10" icon={faFaceDizzy} />
                                </span>
                                <a href="/topic10">Tự tử & Tự làm hại bản thân</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item11" icon={faVenusMars} />
                                </span>
                                <a href="/topic11">Tình dục, LGBT</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item12" icon={faBurger} />
                                </span>
                                <a href="/topic12">Ăn uống, dinh duỡng</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item13" icon={faNotesMedical} />
                                </span>
                                <a href="/topic13">Sức khoẻ</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item14" icon={faQuestion} />
                                </span>
                                <a href="/topic14">Các chủ đề khác</a>   
                            </div>                            
                        </div>
                    </div>
                </div>
        
    );
}

export default Topic;

