import React, { useState } from 'react';
import { authPage } from "../../middlewares/authorizationPage"
import Router from 'next/router';
import Nav from '../../components/Nav';

export async function getServerSideProps(ctx){
    const { token } = await authPage(ctx);
    
    return { props : {
        token
    } }
}

export default function postCreate(props){
    const [ fields, setFields ] = useState({
        title : '',
        content : ''
    })

    const [ status, setStatus ] = useState('normal');

    async function createHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props;

        const createPost = await fetch('/api/posts/create', {
            method : "POST",
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify(fields)
        })

        if(!createPost) return setStatus('Error');

        const res = await createPost.json();

        setStatus('success');

        Router.push('/posts');
    }

    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name] : e.target.value
        });
    }

    return(
        <div>
            <Nav/>
            <h1>Create Post</h1>
            <form onSubmit={createHandler.bind(this)}>
                <input onChange={fieldHandler.bind(this)} type="text" name="title" /> <br />
                <textarea onChange={fieldHandler.bind(this)} name="content" > </textarea> <br />
                <button type="submit">Post</button>
    <div>{ status }</div>
            </form>
        </div>
    )
}