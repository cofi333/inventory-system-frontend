import { useEffect, useState } from "react";
import axios from "axios";
import { userAtom } from "../atoms";
import { useRecoilState } from "recoil";

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useRecoilState(userAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, user.token]);

    return { data, error, loading };
};

export default useFetch;
