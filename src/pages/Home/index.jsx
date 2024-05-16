import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { MAIN_PATHS } from '../../utils/paths';

import { fetchUsersAndThreads } from '../../states/globalSlice';

import { useInput } from '../../hooks/useInput';

import LinkButton from '../../components/ui/LinkButton';
import ThreadSkeleton from './ThreadSkeleton';
import ThreadList from './ThreadList';
import CategorySkeleton from './CategorySkeleton';
import CategoryList from './CategoryList';
import TextInput from '../../components/form/TextInput';
import ThreadPagination from './ThreadPagination';
import { InfoSVG, SearchSVG } from '../../components/ui/Icons';

function HomePage() {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const users = useSelector((state) => state.global.users);
    const threads = useSelector((state) => state.global.threads);
    const isLoading = useSelector((state) => state.global.isLoading);
    const isError = useSelector((state) => state.global.isError);

    // COMPONENT's STATE
    const [filteredThreads, setFilteredThreads] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKeyword, setSearchKeyword] = useInput(searchParams.get('title') || '');
    const [selectedCategory, setSelectedCategory] = React.useState('default');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(filteredThreads.length / itemsPerPage);

    // MODIFIED STATE
    const threadsWithOwner = threads.map((thread) => ({
        ...thread,
        owner: users.find((user) => user.id === thread.ownerId),
    }));
    const categories = ['default', ...new Set(threads.map((thread) => thread.category))];

    // EFFECTS
    React.useEffect(() => {
        dispatch(fetchUsersAndThreads());
    }, []);

    React.useEffect(() => {
        if (searchKeyword) {
            setFilteredThreads(threadsWithOwner.filter((thread) => thread.title.toLowerCase().includes(searchKeyword.toLowerCase())));
        } else {
            setFilteredThreads(threadsWithOwner);
        }
    }, [users, threads]);

    // ACTIONS
    const handleSearch = (event) => {
        const { value } = event.target;
        const filteredByCategory = selectedCategory === 'default' ? threadsWithOwner : threadsWithOwner.filter((thread) => thread.category === selectedCategory);

        setSearchKeyword(event);
        setSearchParams({ title: value });
        setCurrentPage(1);
        setFilteredThreads(filteredByCategory.filter((thread) => thread.title.toLowerCase().includes(value.toLowerCase())));
    };

    const handleCategory = (category) => {
        const filteredByCategory = category === 'default' ? threadsWithOwner : threadsWithOwner.filter((thread) => thread.category === category);

        setSelectedCategory(category);
        setCurrentPage(1);

        if (searchKeyword !== '') {
            setFilteredThreads(filteredByCategory.filter((thread) => thread.title.toLowerCase().includes(searchKeyword.toLowerCase())));
        } else {
            setFilteredThreads(filteredByCategory);
        }
    };

    const handlePagination = (page) => {
        if (currentPage + page <= totalPages && currentPage + page > 0) {
            setCurrentPage((prevPage) => prevPage + page);
        }
    };

    if (isError) {
        return (
            <section className="flex flex-col items-center justify-center px-4 text-center basis-full">
                <h1 className="text-9xl font-black text-secondary ">404</h1>
                <p className="font-bold tracking-tight text-secondary sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-zinc-500">Mohon maaf, terjadi kesalahan saat mengambil daftar diskusi.</p>
            </section>
        );
    }

    return (
        <section className="flex p-8 gap-x-4 basis-full">
            {/* SIDEBAR */}
            <aside className="w-full max-w-xs hidden lg:block">
                <h1 className="p-4 text-3xl font-bold">Daftar Diskusi</h1>
                <div className="space-y-4 p-4">
                    <LinkButton
                        id="new-thread-button"
                        destination={MAIN_PATHS.CREATE_THREAD}
                        variant="glass"
                    >
                        Buat Diskusi Baru
                    </LinkButton>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Pilih Kategori</h2>
                        {(() => {
                            if (isLoading === false && categories.length > 0) {
                                return (
                                    <CategoryList
                                        onChange={(category) => handleCategory(category)}
                                        selectedCategory={selectedCategory}
                                        categories={categories}
                                    />
                                );
                            }
                            return <CategorySkeleton />;
                        })()}
                        <p className="text-sm text-center mx-auto ">🡇</p>
                    </div>
                </div>
            </aside>
            {/* MAIN CONTENT */}
            <section className="flex flex-col gap-y-4 p-4 w-full max-w-4xl">
                {/* SEARCH BAR */}
                <TextInput
                    id="search"
                    type="text"
                    placeholder="Cari judul diskusi..."
                    value={searchKeyword}
                    onChange={(event) => handleSearch(event)}
                >
                    <SearchSVG className="w-4 h-4 opacity-70" />
                </TextInput>
                {/* THREAD LIST */}
                {(() => {
                    if (isLoading === false && filteredThreads.length === 0) {
                        return (
                            <section className="card w-full bg-base-100">
                                <div className="card-body gap-y-4 w-full p-8">
                                    <div className="flex gap-x-2 items-center w-full">
                                        <InfoSVG className="w-8 h-8 stroke-primary" />
                                        <div className="h-fit w-fit font-bold text-center">{`Tidak ada diskusi dengan judul "${searchKeyword}"`}</div>
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    if (isLoading === false && filteredThreads.length > 0) {
                        return <ThreadList threads={filteredThreads.slice(startIndex, endIndex)} />;
                    }
                    return <ThreadSkeleton />;
                })()}
                {/* PAGINATION */}
                <ThreadPagination
                    disabledNext={currentPage === totalPages || totalPages === 0}
                    disabledPrevious={currentPage === 1}
                    action={(page) => handlePagination(page)}
                    currentPage={currentPage}
                />
            </section>
        </section>
    );
}

export default HomePage;
