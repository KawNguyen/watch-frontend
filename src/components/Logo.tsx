import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WatchLogo() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date()); // Giờ local (ở Việt Nam là UTC+7)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12;

    const rotation = {
        second: seconds * 6, // mỗi giây quay 6 độ
        minute: minutes * 6 + seconds * 0.1, // mỗi phút 6 độ + offset từ giây
        hour: hours * 30 + minutes * 0.5, // mỗi giờ 30 độ + offset từ phút
    };

    return (
        <div>
            <div className="text-4xl font-bold text-center">
                {`${time.getHours().toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </div>
            {/* <div className="relative w-16 h-16 border-[6px] border-black rounded-full">
                <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-black rounded-full z-10 transform -translate-x-1/2 -translate-y-1/2" />
                <motion.div
                    className="absolute top-1 left-1/2 w-2 h-12 bg-black rounded-full"
                    animate={{ rotate: rotation.hour }}
                    style={{
                        transform: "translate(-50%, -100%)",
                        transformOrigin: "-110% 115%",
                    }}
                />
                <motion.div
                    className="absolute top-1 left-1/2 w-2 h-14 bg-black  rounded-full"
                    animate={{ rotate: rotation.minute }}
                    style={{
                        transform: "translate(-50%, -100%)",
                        transformOrigin: "70% 110%",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-2 h-16 bg-red-500     rounded-full"
                    animate={{ rotate: rotation.second }}
                    style={{
                        transform: "translate(100%, 100%)",
                        transformOrigin: "50% 0",
                    }}
                />
            </div> */}
        </div>



    );
}
