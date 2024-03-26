'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form } from '@components/Form';

const CreatePrompt = () => {
    const [submiting, setSubmiting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (event) => {
        event.preventDefault();

        setSubmiting(true);
        try {
            const reponse = await fetch('/api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.use.id,
                        tag: post.tag
                    })
                })
            if (reponse.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);

        } finally {
            setSubmiting(false);
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={createPrompt}
        />
    )
}


export default CreatePrompt;