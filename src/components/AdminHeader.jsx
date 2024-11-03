import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import noti_icon from '../assets/bell.png';

const items = [
    {
        key: '1',
        label: 'My Account',
        disabled: true,
    },
    {
        type: 'divider',
    },
    {
        key: '2',
        label: 'Profile',
        extra: '⌘P',
    },
    {
        key: '3',
        label: 'Billing',
        extra: '⌘B',
    },
    {
        key: '4',
        label: 'Settings',
        icon: <SettingOutlined />,
        extra: '⌘S',
    },
    {
        key: '5',
        label: 'Logout',
    },
];

function AdminHeader() {
    return (
        <div className="flex justify-end items-center bg-black text-white p-2 ">
            <div className="relative mr-4">
                <img
                    src={noti_icon}
                    alt="Notifications"
                    className="w-6 h-6 cursor-pointer"
                />
            </div>

            <div className="relative">
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <div className="flex items-center">
                        <button
                            className="bg-white text-customGreen rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                            P
                        </button>
                        <DownOutlined className="ml-2" />
                    </div>

                </Dropdown>
            </div>
        </div>
    );
}

export default AdminHeader;
