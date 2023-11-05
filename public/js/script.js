const nameInput = $('#name-input');
const usernameInput = $('#username-input');
const passwordInput = $('#password-input');
const signupButton = $('#signup-button');
const loginButton = $('#login-button');
const createPostButton = $('#create-post-button');
const postDialog = document.getElementById('post-dialog');
const postTitle = $('#post-title');
const postContent = $('#post-content');
const addPostButton = $('#add-post-button');
const logoutButton = $('#logout-button');
const commentBody = $('#comment-body');
const addCommentButton = $('#add-comment-button');

addCommentButton.on('click', async function (event) {
	const comment = commentBody.val();
	const post_id = commentBody.data('post-id');
	if (!comment) return alert('Please fill out all fields!');
	console.log(comment, post_id);
	try {
		const response = await axios.post('/post/comment', {
			comment,
			post_id,
		});
		if (response.status === 200) window.location.reload();
	} catch (err) {
		if (err.response.data.message) return console.log(err.response.data.message);
		console.log(err);
	}
});

logoutButton.on('click', async function (event) {
	try {
		const response = await axios.post('/logout');
		if (response.status === 200) window.location.replace('/');
	} catch (err) {
		console.log(err);
	}
});

addPostButton.on('click', async function (event) {
	postDialog.showModal();
	createPostButton.on('click', async function (event) {
		event.preventDefault();
		const title = postTitle.val();
		const content = postContent.val();
		if (!title || !content) return alert('Please fill out all fields!');
		try {
			const response = await axios.post('/dashboard', {
				title,
				content,
			});
			if (response.status === 200) {
				postDialog.close();
				window.location.reload();
			}
		} catch (err) {
			if (err.response.data.message) return console.log(err.response.data.message);
			console.log(err);
		}
	});
});

signupButton.on('click', async function (event) {
	const name = nameInput.val();
	const username = usernameInput.val();
	const password = passwordInput.val();
	if (!name || !username || !password) return alert('Please fill out all fields!');
	try {
		const response = await axios.post('/signup', {
			name,
			username,
			password,
		});
		if (response.status === 200) window.location.replace('/dashboard');
	} catch (err) {
		if (err.response.data.message) return console.log(err.response.data.message);
		console.log(err);
	}
});

loginButton.on('click', async function (event) {
	const username = usernameInput.val();
	const password = passwordInput.val();
	if (!username || !password) return alert('Please fill out all fields!');
	try {
		const response = await axios.post('/login', {
			username,
			password,
		});
		if (response.status === 200) window.location.replace('/dashboard');
	} catch (err) {
		if (err.response.data.message) return console.log(err.response.data.message);
		console.log(err);
	}
});
