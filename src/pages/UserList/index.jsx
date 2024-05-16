import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsersAndThreads } from '../../states/globalSlice';

import { useInput } from '../../hooks/useInput';

import UserPagination from './UserPagination';
import TextInput from '../../components/form/TextInput';
import { SearchSVG } from '../../components/ui/Icons';

function UserListPage() {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const isLoading = useSelector((state) => state.global.isLoading);
    const users = useSelector((state) => state.global.users);

    // COMPONENT's STATE
    const [filteredUsers, setFilteredUsers] = React.useState(users || []);
    const [searchKeyword, setSearchKeyword] = useInput('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // EFFECTS
    React.useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsersAndThreads());
        } else {
            setFilteredUsers(users);
        }
    }, [users]);

    // ACTIONS
    const handleSearch = (event) => {
        const { value } = event.target;

        setSearchKeyword(event);
        setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())));
        setCurrentPage(1);
    };

    const handlePagination = (page) => {
        if (currentPage + page <= totalPages && currentPage + page > 0) {
            setCurrentPage((prevPage) => prevPage + page);
        }
    };

    return (
        <main className="p-8 flex gap-x-4 basis-full">
            <aside className="w-full max-w-xs hidden lg:block">
                <h1 className="p-4 text-3xl font-bold">Daftar User</h1>
                <div className="space-y-4 p-4 ">
                    <p>Kamu dapat melihat seluruh user yang menggunakan aplikasi ini.</p>
                    <p>Gunakan fitur search & paginasi agar mempermudah pencarianmu.</p>
                </div>
            </aside>
            <section className="flex flex-col gap-y-4 p-4 w-full max-w-4xl">
                <TextInput
                    id="search"
                    type="text"
                    placeholder="Cari nama pengguna..."
                    value={searchKeyword}
                    onChange={(event) => handleSearch(event)}
                >
                    <SearchSVG className="w-4 h-4 opacity-70" />
                </TextInput>
                <div className="overflow-x-auto">
                    <table className="table p-4 ">
                        <thead>
                            <tr>
                                <th className="w-1/4">No</th>
                                <th className="w-3/4">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                if (isLoading === false && filteredUsers.length === 0) {
                                    return (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="skeleton rounded-none w-full text-center"
                                            >
                                                User tidak ditemukan.
                                            </td>
                                        </tr>
                                    );
                                }
                                if (isLoading === false && filteredUsers.length > 0) {
                                    return filteredUsers.slice(startIndex, endIndex).map((user, index) => (
                                        <tr key={user.id}>
                                            <th className="w-1/4">{startIndex + index + 1}</th>
                                            <td className="flex items-center gap-x-2 w-3/4">
                                                <img
                                                    alt="User Avatar"
                                                    src={user.avatar}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-bold uppercase">{user.name}</span>
                                            </td>
                                        </tr>
                                    ));
                                }
                                return (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="skeleton rounded-none w-full text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>
                <UserPagination
                    disabledNext={currentPage === totalPages || totalPages === 0}
                    disabledPrevious={currentPage === 1}
                    action={(page) => handlePagination(page)}
                    currentPage={currentPage}
                />
            </section>
        </main>
    );
}

export default UserListPage;
