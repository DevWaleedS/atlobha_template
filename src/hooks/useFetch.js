import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url) {
    const token = localStorage.getItem('token');
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true);
                    const response = await axios.get(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFetchedData(response.data);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }());
    }, [url, reload]);

    return {
        fetchedData, error, loading, reload, setReload,
    };
}
