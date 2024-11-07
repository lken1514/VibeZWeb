import React, { useEffect, useState } from 'react';
import StatsGrid from './SubComponent/StatsGrid';
import ChartComponent from './SubComponent/ChartComponent';
import TopSongs from './SubComponent/TopSongs';
import CreateAlbum from './CreateAlbum';
import './styles.css'

const Dashboard = () => {
    const [data, setData] = useState({
        liveListeners: 8,
        listeners: 62,
        newFollowers: 23,
        unfollows: 3,
        newStreams: 83,
        savedPlaylists: 25, 
        streamHours: 1396,
        topSongs: [
            { title: 'Song A', listeners: 25 },
            { title: 'Song B', listeners: 23 },
            { title: 'Song C', listeners: 20 },
            { title: 'Song D', listeners: 20 },
            { title: 'Song E', listeners: 18 },
            { title: 'Song F', listeners: 17 },
            { title: 'Song G', listeners: 15 },
        ],
        chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            men: [12, 19, 3, 5, 2, 3, 9, 10, 13, 7, 12, 6],
            women: [7, 14, 12, 18, 6, 9, 8, 12, 16, 5, 10, 12],
        },
    });

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <p>My new album</p>
                <div className="header-controls">
                    <select className='time-frame'>
                        <option>Last 24 hours</option>
                        <option>Last 7 days</option>
                        <option>Last 28 days</option>
                    </select>
                    <button className='button'>Download as CSV</button>
                    {/* <button>New dashboard</button> */}
                    <CreateAlbum />
                </div>
            </div>
            <StatsGrid data={data} />
            <div className="charts">
                <ChartComponent chartData={data.chartData} />
                <TopSongs songs={data.topSongs} />
            </div>
        </div>
    );
};

export default Dashboard;
