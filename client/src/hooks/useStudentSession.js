import { useEffect, useState } from "react";
import axios from "axios";

const useStudentSession = () => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async() => {
            try {
                const res = await axios.get("http://localhost:8000/api/students/check-session", { withCredentials: true });
                setIsLoggedIn(res.data.isLoggedIn);
            } catch (err) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return { isLoggedIn, loading };
};

export default useStudentSession;