import { useState, useEffect } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
const useFetch = <T>(url:string) : UseFetchResult<T> => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(url);
        //         if (!response.ok) {
        //             throw new Error("Failed to fetch data");
        //         }
        //         const result = await response.json();
        //         setData(result);
        //     } catch (err) {
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchData();
        // let isMounted = true; // To avoid setting state on unmounted component
        // fetch(url)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error("Failed to fetch data");
        //         }
        //         return response.json();
        //     })
        //     .then(result => {
        //         if (isMounted) {
        //             setData(result);
        //         }
        //     })
        //     .catch(err => {
        //         if (isMounted) {
        //             setError(err.message);
        //         }
        //     })
        //     .finally(() => {
        //         if (isMounted) {
        //             setLoading(false);
        //         }
        //     });
        // return () => {  isMounted = false; };
        const controller = new AbortController();
        fetch(url, { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(result => {
                setData(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });

            return () => { controller.abort(); }
    }, [url]);

    return { data, loading, error };
};

export default useFetch;