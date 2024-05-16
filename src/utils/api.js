const api = (() => {
    const BASE_URL = 'https://forum-api.dicoding.dev/v1';

    function getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    function putAccessToken(token) {
        localStorage.setItem('accessToken', token);
    }

    async function _fetchWithAuth(url, options = {}) {
        if (!getAccessToken()) {
            throw new Error('Token not found, login first to access full features of this app!');
        }

        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }

    async function register({ name, email, password }) {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { user },
        } = responseJson;

        return { status, message, user };
    }

    async function login({ email, password }) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { token },
        } = responseJson;

        return { status, message, token };
    }

    async function getOwnProfile() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { user },
        } = responseJson;

        return user;
    }

    async function getAllUsers() {
        const response = await fetch(`${BASE_URL}/users`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { users },
        } = responseJson;

        return users;
    }

    async function getAllThreads() {
        const response = await fetch(`${BASE_URL}/threads`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { threads },
        } = responseJson;

        return threads;
    }

    async function getThreadDetail(id) {
        const response = await fetch(`${BASE_URL}/threads/${id}`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { detailThread },
        } = responseJson;

        return detailThread;
    }

    async function createThread({ title, body, category = '' }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body,
                category,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { thread },
        } = responseJson;

        return { thread, status, message };
    }

    async function upVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function downVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function neutralizeThreadVote(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function createComment({ threadId, content }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { comment },
        } = responseJson;

        return { comment, status, message };
    }

    async function upVoteComment({ commentId, threadId }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function downVoteComment({ commentId, threadId }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function neutralizeCommentVote({ commentId, threadId }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { vote },
        } = responseJson;

        return { vote, status, message };
    }

    async function getLeaderboards() {
        const response = await fetch(`${BASE_URL}/leaderboards`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { leaderboards },
        } = responseJson;

        return leaderboards;
    }

    return {
        putAccessToken,
        getAccessToken,
        register,
        login,
        getOwnProfile,
        getAllUsers,
        getAllThreads,
        createThread,
        getThreadDetail,
        upVoteThread,
        downVoteThread,
        neutralizeThreadVote,
        createComment,
        upVoteComment,
        downVoteComment,
        neutralizeCommentVote,
        getLeaderboards,
    };
})();

export default api;
