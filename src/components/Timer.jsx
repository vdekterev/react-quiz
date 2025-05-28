import { useEffect, useState } from "react";


export default function Timer({ timeLimit, onFinish }) {
    const [time, setTime] = useState(timeLimit);

    if (time < 0) {
        onFinish()
    }

    const formatTime = () => {
        const hrs = ~~(time / 3600);
        const mins = ~~((time % 3600) / 60);
        const secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }
    const formattedTime = formatTime(time);

    useEffect(() => {
        const timerID = setInterval(() => setTime(t => t - 1), 1000);
        return () => clearInterval(timerID);
    }, [timeLimit]);

    return (
        <div className="timer">{formattedTime}</div>
    );
}