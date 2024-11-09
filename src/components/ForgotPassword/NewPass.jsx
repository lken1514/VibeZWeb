import { useState } from 'react';

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const togglePassword = (inputId) => {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
    };

    const validatePassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage('Confirm password must be exactly the same');
        } else {
            setErrorMessage('');
            setIsSuccess(true);
        }
    };

    return (
        <div className="flex justify-center  min-h-screen bg-black">
            {!isSuccess ? (
                <div className="bg-black p-10 rounded-lg text-center w-[400px]">
                    <h1 className="text-white mb-5 text-4xl font-bold">New Password</h1>
                    <p className="text-white mb-5 text-sm">
                        Set the new password for your account so you can login and access all features.
                    </p>
                    <form onSubmit={validatePassword}>
                        <div className="text-left mb-5">
                            <label htmlFor="new-password" className="text-white text-sm mb-2 block font-bold">Enter new password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full p-4 mb-5 border !border-[#535353] rounded-md text-base text-white !bg-black placeholder-text-black"
                                    placeholder="Enter new password"
                                />
                                <span className="absolute right-2 top-3 cursor-pointer text-white text-lg" onClick={() => togglePassword('new-password')}>
                                    <i className="fas fa-eye"></i>
                                </span>
                            </div>
                        </div>
                        <div className="text-left mb-5">
                            <label htmlFor="confirm-password" className="text-white font-bold text-sm mb-2 block">Confirm password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full p-4 mb-5 border !border-[#535353] rounded-md text-base text-white !bg-black placeholder-text-black"
                                    placeholder="Confirm password"
                                />
                                <span className="absolute right-2 top-3 cursor-pointer text-[#1DB954] text-lg" onClick={() => togglePassword('confirm-password')}>
                                    <i className="fas fa-eye"></i>
                                </span>
                            </div>
                            {errorMessage && <small className="text-[#FF4C4C] text-xs mt-2">{errorMessage}</small>}
                        </div>
                        <button type="submit" className="w-full p-3 bg-[#199043] text-black font-bold text-lg rounded transition duration-300 hover:bg-[#22d162]">
                            Update Password
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center bg-[#A7D497] p-10 rounded-lg">
                    <h1 className="text-2xl text-[#2D693A]">Successfully</h1>
                    <p className="text-lg text-gray-600 mb-5">Your password has been reset successfully!</p>
                    <button onClick={() => alert('Return to login page')} className="bg-[#3B7E3A] text-white px-5 py-2 text-lg rounded">
                        Return to Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewPassword;
