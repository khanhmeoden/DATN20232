import React from "react";
import './PurposeContent.css'

const PurposeContent = () => {
    return(
        <div className="purpose-header">
            <div className="purpose-infor author">Người viết</div>
            <div className="purpose-infor title">Tiêu đề</div>
            <div className="purpose-infor topic">Chủ đề</div>
            <div className="purpose-infor like">Thích</div> 
            <div className="purpose-infor comment">Bình luận</div>
            <div className="purpose-infor time">Thời gian</div>  
        </div>
    )
}

export default PurposeContent