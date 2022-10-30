import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {

            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                method, body, headers
            });


            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const requestWithFiles = useCallback(async (url, method = 'GET', body = null, files = null, headers = {}) => {
        setLoading(true);
        try {

            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            if (files) {
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append("pic", files[i]);
                }
                files = formData;
            }
            console.log(body);
            console.log("vova");
            console.log(files);
            const response = await fetch(url, {
                method, body, files, headers
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    
    const requestWithFile = useCallback(async (url, method = 'GET', body = null, file = null, headers = {}) => {
        setLoading(true);
        try {

            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            if (file) {
                const formData = new FormData();
                formData.append(`pic`, file);
                headers['Content-Type'] = 'multipart/form-data';
            }

            const response = await fetch(url, {
                method, body, file, headers
            });


            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, requestWithFile, requestWithFiles, error, clearError };
}


// import { useState, useCallback } from "react";

// export const useHttp = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
//         setLoading(true);
//         try {

//             if (body) {
//                 body = JSON.stringify(body);
//                 headers['Content-Type'] = 'application/json';
//             }

//             const response = await fetch(url, {
//                 method, body, headers
//             });


//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong');
//             }
//             setLoading(false);

//             return data;

//         } catch (e) {
//             setLoading(false);
//             setError(e.message);
//             throw e;
//         }
//     }, []);

//     const clearError = useCallback(() => setError(null), []);

//     return { loading, request, error, clearError };
// }