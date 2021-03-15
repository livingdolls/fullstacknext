import React, { useState } from 'react';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx){
    await unauthPage(ctx);
    
    return { props : { } }
}
export default function register(){
    const [fields, setFields] = useState({
        email : '',
        password : ''
    })

    const [status, setStatus] = useState('normal');
 
    async function registerHandler(e){
        e.preventDefault();

        setStatus('loading');

        const registerReq = await fetch('/api/auth/register', {
            method : 'POST',
            body : JSON.stringify(fields),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        if(!registerReq) return setStatus('eror', + registerReq.status);

        const registerRes = await registerReq.json();

        setStatus('Success')

    }

    function fieldHandler(e){
        const name = e.target.getAttribute('name');
        setFields({
            ...fields,
            [name] : e.target.value
        })
    }
    return(
        <div>
            <h1>Register</h1>

            <form onSubmit={registerHandler.bind(this)}>
                <input type="text" onChange={fieldHandler.bind(this)} name="email" /> <br />
                <input type="password" onChange={fieldHandler.bind(this)} name="password" /> <br /> 
                <button type="submit"> Register </button>
                <div> Output : { status }</div>
            </form>
            <hr/>
            <Link href="/auth/login" >Login</Link>
        </div>
    )
}