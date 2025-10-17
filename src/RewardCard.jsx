import React from "react";
import "./RewardCard.css";

const RewardCard = ({ reward = "🎉 You won ₹100 OFF on your next order!" }) => {
  return (
    <div className="reward-card-container">
      <div className="reward-card shadow-sm">
        <h5 className="reward-title">Congratulations!</h5>
        <p className="reward-text">{reward}</p>
        <button className="btn btn-warning mt-2 fw-bold">Claim Now</button>
      </div>
    </div>
  );
};

export default RewardCard;
