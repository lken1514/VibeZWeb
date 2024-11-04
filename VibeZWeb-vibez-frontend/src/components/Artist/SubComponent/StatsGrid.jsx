import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faUserSlash, faPlayCircle, faSave, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const StatsGrid = ({ data }) => (
    <div className="stats-grid">
        {[
            { label: 'Listeners', value: data.listeners, icon: faUsers },
            { label: 'New followers', value: data.newFollowers, icon: faUserPlus },
            { label: 'Unfollows', value: data.unfollows, icon: faUserSlash },
            { label: 'New streams', value: data.newStreams, icon: faPlayCircle },
            { label: 'Saved as playlist', value: data.savedPlaylists, icon: faSave },
            { label: 'Streams total hours', value: data.streamHours, icon: faHourglassHalf },
        ].map((stat, index) => (
            <div key={index} className="stat-card" role="region" aria-label={stat.label}>
                <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                <div className="stat-number-label-container">
            <p className="stat-number">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
        </div>
            </div>
        ))}
    </div>
);

export default StatsGrid;
