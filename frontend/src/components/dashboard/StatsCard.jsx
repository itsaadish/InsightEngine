import React from 'react';

const StatsCard = ({ title, value, icon: Icon, variant, badgeValue, period = 'This week' }) => {
  if (variant === 'gradient') {
    return (
      <div className="stat-card gradient-card">
        <div className="stat-info-light">
          <h3>{title}</h3>
          <p className="stat-value">{value}</p>
          {badgeValue && <span className="badge">{badgeValue}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-main">
        <div className="stat-info">
          <h3>{title}</h3>
          <p className="stat-value">{value}</p>
          <span className="stat-period">{period}</span>
        </div>
        <div className={`stat-icon-wrapper ${variant}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
