import React from "react";
import './Purpose.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const Purpose = () => {
    const navigate = useNavigate();
    return (
                <div className="purpose-table">
                    <div className="wpforo-category">
                        <div className="wpforo-cat-panel">
                            <div className="cat-title" title="">
                                <span className="cat-icon">
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                </span>
                                <span className="cat-name">MỤC ĐÍCH THẢO LUẬN</span>
                            </div>
                        </div>
                    </div>

                    <div className="forum-purpose">
                        <div className="forum-purpose-list">   
                            <div className="purpose-item1" onClick={() => navigate('/purpose1')}>                    
                                <a href="/purpose1">Cần lời khuyên</a>   
                            </div>
                            
                            <div className="purpose-item2" onClick={() => navigate('/purpose2')}>                    
                                <a href="/purpose2">Đưa lời khuyên</a>   
                            </div>
                            
                            <div className="purpose-item3" onClick={() => navigate('/purpose3')}>                    
                                <a href="/purpose3">Tâm sự và chia sẻ</a>   
                            </div>
                            
                            <div className="purpose-item4" onClick={() => navigate('/purpose4')}>                    
                                <a href="/purpose4">Câu chuyện thường ngày & Tán gẫu</a>   
                            </div>                            
                        </div>
                    </div>
                </div>
        
    );
}

export default Purpose;

