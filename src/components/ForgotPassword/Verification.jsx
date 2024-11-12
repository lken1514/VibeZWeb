import { useState, useEffect } from 'react';

const Verification = () => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timeLeft]);

    const moveToNext = (event, nextFieldId) => {
        if (event.target.value.length === event.target.maxLength) {
            const nextField = document.getElementById(nextFieldId);
            if (nextField) nextField.focus();
        }
    };

    const formatTime = () => {
        const seconds = timeLeft % 60;
        return `00:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="flex justify-center  min-h-screen bg-black">
            <div className="bg-black p-10 rounded-lg text-center w-[400px]">
                <h1 className="text-white mb-5 text-4xl font-bold">Verification</h1>
                <p className="text-white mb-5 text-sm">Enter your 4 digits code that you received on your email.</p>
                <form action="#" method="post">
                    <div className="flex justify-between mb-5">
                        <input
                            type="text"
                            maxLength="1"
                            required
                            onInput={(e) => moveToNext(e, 'input2')}
                            className="w-[60px] h-[60px] text-2xl text-center border border-white rounded bg-[#333333] text-white"
                        />
                        <input
                            type="text"
                            maxLength="1"
                            required
                            id="input2"
                            onInput={(e) => moveToNext(e, 'input3')}
                            className="w-[60px] h-[60px] text-2xl text-center border border-white rounded bg-[#333333] text-white"
                        />
                        <input
                            type="text"
                            maxLength="1"
                            required
                            id="input3"
                            onInput={(e) => moveToNext(e, 'input4')}
                            className="w-[60px] h-[60px] text-2xl text-center border border-white rounded bg-[#333333] text-white"
                        />
                        <input
                            type="text"
                            maxLength="1"
                            required
                            id="input4"
                            className="w-[60px] h-[60px] text-2xl text-center border border-white rounded bg-[#333333] text-white"
                        />
                    </div>
                    <div className="text-white text-lg mb-5">{formatTime()}</div>
                    <button type="submit" className="w-full p-3 bg-[#1DB954] text-[#191414] text-lg rounded transition duration-300 hover:bg-[#14833B]">
                        Continue
                    </button>
                </form>
                <p className="text-white mt-5">
                    If you didn't receive a code! <a href="#" className="text-white font-bold hover:underline">Resend</a>
                </p>
            </div>
        </div>
    );
};

export default Verification;
