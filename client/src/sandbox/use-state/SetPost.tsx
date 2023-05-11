import React, { useState } from "react";
import { MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Post {
    createdAt: string | Date,
    author: string,
    subtitle: string,
    title: string,
}

const SetPost = () => {

  const INITIAL_POST: Post = {
    createdAt: "",
    author: "",
    subtitle: "",
    title: "",
  };

  const [isLogged, setIsLogged] = useState(false);
  const [post, setPost] = useState(INITIAL_POST);
  const [posts, setPosts] = useState<[] | Post[]>([]);

  type Event = MouseEvent<HTMLButtonElement>;
  
  console.log(isLogged);

const createNewPost = (e: Event) => {
    e.preventDefault()
    setPosts((prev) => [...prev, {...post, createdAt: new Date() }]);
    return setPost(INITIAL_POST)
}

return (
    <div>
    {isLogged && (
        <form>
        <input
            type="text"
            placeholder="Enter a title"
            onChange={(event) =>
                setPost((prev) => ({ ...prev, title: event.target.value }))
            }
            value={post.title}
        />
        <br />
        <input
            type="text"
            placeholder="Enter a subtitele"
            onChange={(event) =>
                setPost((prev) => ({ ...prev, subtitle: event.target.value }))
            }
            value={post.subtitle}
        />
        <br />
        <input
            type="text"
            placeholder="Enter a author"
            onChange={(event) =>
                setPost((prev) => ({ ...prev, author: event.target.value }))
            }
            value={post.author}
        />
        </form>
    )}
    <button onClick={() => setIsLogged((prev) => !prev)}>{isLogged? "Logout":"Login"}</button>
    <button disabled={!post.title || !post.subtitle || !post.author} onClick={createNewPost}>Create Post</button>
    <br />
    <br />

    {isLogged && !!posts.length && (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{backgroundColor:"green"}}>
        <TableRow>
            <TableCell align="left">No.</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">SubTitle</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">CreatedAt</TableCell>
        </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:"lightgreen"}}>
        {posts.map((post, index) => (
            <TableRow key={index}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell align="left">{post.title}</TableCell>
            <TableCell align="left">{post.subtitle}</TableCell>
            <TableCell align="left">{post.author}</TableCell>
            <TableCell align="left">{post.createdAt.toLocaleString()}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </TableContainer>
    )}

    </div>
);
};

export default SetPost;