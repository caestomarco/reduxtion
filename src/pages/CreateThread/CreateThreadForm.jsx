import React from 'react';
import { useDispatch } from 'react-redux';

import { useInput } from '../../hooks/useInput';

import { createThread } from '../../states/globalSlice';

import SubmitButton from '../../components/ui/SubmitButton';
import TextInput from '../../components/form/TextInput';
import TextAreaInput from '../../components/form/TextAreaInput';

function CreateThreadForm() {
    // HOOKS
    const dispatch = useDispatch();

    // COMPONENT STATE
    const [title, setTitle] = useInput('');
    const [body, setBody] = useInput('');
    const [category, setCategory] = useInput('', 20);

    // ACTIONS
    const handleCreateThread = (event) => {
        event.preventDefault();
        dispatch(createThread({ title, body, category }));
    };

    return (
        <form
            className="space-y-4"
            onSubmit={(event) => handleCreateThread(event)}
        >
            <div className="flex flex-col items-stretch justify-start">
                <h1 className="text-lg lg:text-xl font-semibold text-primary">
                    Judul
                    <span className="relative">
                        <span className="flex absolute top-1 -right-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                            <span className="relative inline-flex rounded-full h-1 w-1 bg-error" />
                        </span>
                    </span>
                </h1>
                <p className="text-sm mb-2 ">Buatlah pertanyaan yang spesifik dan bayangkan Anda mengajukan pertanyaan kepada orang lain.</p>
                <TextInput
                    id="title"
                    type="text"
                    placeholder="Masukkan judul"
                    value={title}
                    onChange={(event) => setTitle(event)}
                    required
                />
            </div>
            <div className="flex flex-col items-start justify-start h-[40vh]">
                <h1 className="text-lg lg:text-xl font-semibold text-primary">
                    Konten (Body)
                    <span className="relative">
                        <span className="flex absolute top-1 -right-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                            <span className="relative inline-flex rounded-full h-1 w-1 bg-error" />
                        </span>
                    </span>
                </h1>
                <p className="text-sm mb-2">Sertakan semua informasi yang dibutuhkan agar diskusi lebih menarik.</p>
                <TextAreaInput
                    id="content"
                    placeholder="Masukkan konten"
                    value={body}
                    onChange={(event) => setBody(event)}
                    required
                />
            </div>
            <div className="flex flex-col items-stretch justify-start">
                <h1 className="text-lg lg:text-xl font-semibold text-primary">Kategori</h1>
                <p className="text-sm mb-2">Tambahkan kategori untuk mendeskripsikan pertanyaan Anda.</p>
                <TextInput
                    id="title"
                    type="text"
                    placeholder="Masukkan kategori (tidak wajib)"
                    value={category}
                    onChange={(event) => setCategory(event)}
                    required={false}
                />
            </div>
            <div className="flex items-center justify-end">
                <SubmitButton
                    id="create-note-button"
                    variant="wide"
                >
                    Buat Diskusi
                </SubmitButton>
            </div>
        </form>
    );
}

export default CreateThreadForm;
