import { useState, useEffect } from 'react';
import axios from 'api/axios';

// hook 사용은 함수 처리 안에서는 사용 불가함
function useFetch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    // uri가 바뀔때만 fetch, 바뀌지 않을때는 데이터들이 state로 관리 되고 있음 저장되어 있는 데이터로 return.
    // uri가 바뀌는 요청이 들어올 때만 요청해서 처리
    useEffect(() => {
        if (!uri) return;

        fetch(uri)
            .then(response => response.json())
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri]);
    return { loading, data, error };
}

function usePost(uri, body) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uri || !body) return;

        axios.post(uri, body,
            {
                headers: { "Content-Type": "application/json" },
                responseType: "blob"
            })
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri, body]);
    return { loading, data, error };
}

export { useFetch, usePost };