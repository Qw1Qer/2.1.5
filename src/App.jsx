import React, {useEffect, useState} from 'react';
import ky from "ky";
import './App.css';

const App = () => {

    const [posts, setPosts] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setId(prevId => prevId + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        (async () => {
            const data = await ky.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                timeout: 10000,
                retry: 2
            }).json();
            setPosts(() => [...posts,data])
        })()
    }, [id])



    return (
        <div>
            {posts.map(post => (
                <div className='posts' key={post.id}>
                    <h1>{post.title}</h1>
                    <h3>{post.body}</h3>
                </div>
            ))}
        </div>
    );
};

export default App;
