import React, { useState } from 'react';
import { authPage } from "../../../middlewares/authorizationPage"
import Router from 'next/router';

export async function getServerSideProps(ctx){
    const { token } = await authPage(ctx);
    const { id } = ctx.query;

    const editReq = await fetch('http://localhost:3000/api/posts/detail/' + id, {
        headers :{
            'Authorization' : 'Bearer ' + token
        }
    })
    
    const res = await editReq.json();

    console.log(res)

    return { props : {
        token,
        post : res.data
    } }
}

export default function postCreate(props){
    const { post } = props

    const [ fields, setFields ] = useState({
        title : post.title,
        content : post.content
    })


    const [ status, setStatus ] = useState('normal');

    async function updateHandler(e){
        e.preventDefault();


        setStatus('loading');

        const { token } = props;

        const createUpdate = await fetch('/api/posts/update/'+ post.id, 
        {
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify(fields)
        })

        if(!createUpdate.ok) return setStatus('Error');

        const res = await createUpdate.json();

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
            <h1>Create Post</h1>
            <form onSubmit={updateHandler.bind(this)}>
                <input onChange={fieldHandler.bind(this)} type="text" defaultValue={ post.title } name="title" /> <br />
                <textarea onChange={fieldHandler.bind(this)} name="content" defaultValue={ post.content }></textarea> <br />
                <button type="submit">Simpan</button>
    <div>{ status }</div>
            </form>
        </div>
    )
}