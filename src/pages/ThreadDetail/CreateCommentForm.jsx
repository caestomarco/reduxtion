import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInput } from '../../hooks/useInput';

import { createComment } from '../../states/thread/threadSlice';

import TextAreaInput from '../../components/form/TextAreaInput';
import SubmitButton from '../../components/ui/SubmitButton';
import LinkButton from '../../components/ui/LinkButton';
import { WriteSVG, InfoSVG } from '../../components/ui/Icons';

function CreateCommentForm({ threadId }) {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isError = useSelector((state) => state.user.isError);

    // COMPONENT's STATE
    const [content, setContent] = useInput('');

    // ACTIONS
    const handleCreateComment = (event) => {
        event.preventDefault();
        dispatch(createComment({ threadId, content }));
        setContent('');
    };

    if (isLoggedIn === false || isError === true) {
        return (
            <div
                role="alert"
                className="alert shadow-lg"
            >
                <InfoSVG className="w-6 h-6 stroke-secondary" />
                <div>
                    <h3 className="font-bold">Unauthenticated!</h3>
                    <div className="text-xs">Silakan login terlebih dahulu agar dapat memberi komentar</div>
                </div>
                <LinkButton
                    id="login-button"
                    destination="/auth/login"
                    variant="ghost"
                >
                    Masuk
                </LinkButton>
            </div>
        );
    }

    return (
        <article className="card">
            <form
                className="card-body gap-y-4"
                onSubmit={(event) => handleCreateComment(event)}
            >
                <div className="w-full gap-x-2 card-title justify-between ">
                    <h1 className="flex items-center gap-x-2">
                        <WriteSVG className="w-6 h-6 stroke-secondary" />
                        <span className="text-xl font-bold text-secondary">Berikan Komentar</span>
                    </h1>
                </div>

                <div className="flex flex-col items-start justify-start h-[20vh]">
                    <TextAreaInput
                        id="comment"
                        placeholder="Masukkan komentar Anda disini..."
                        value={content}
                        onChange={(event) => setContent(event)}
                        required
                    />
                </div>
                <div className="flex items-center justify-end">
                    <SubmitButton
                        id="create-comment-button"
                        variant="wide"
                    >
                        Kirim Komentar
                    </SubmitButton>
                </div>
            </form>
        </article>
    );
}

export default CreateCommentForm;
