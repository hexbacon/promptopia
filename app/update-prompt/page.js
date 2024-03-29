'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/router';
import { Form } from '@components/Form';

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const router = useRouter();
    const promptId = router.query.id;

    useEffect(() => {
        const getPromptDetails = async () => {
            if (!promptId) return;

            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch prompt details');
                }
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            } catch (error) {
                console.error('Error fetching prompt details:', error);
            }
        };
        getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (event) => {
        event.preventDefault();

        if (!promptId) {
            alert("Prompt ID not found!");
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });
            if (response.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to update prompt');
            }
        } catch (error) {
            console.error('Error updating prompt:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>
    );
};

export default EditPrompt;
