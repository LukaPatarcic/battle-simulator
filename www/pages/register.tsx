import { getCsrfToken } from 'next-auth/react';
import { signUp } from '@api/auth';

export default function Register() {
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		signUp({
			username: formData.get('username'),
			password: formData.get('password'),
		});
	};
	return (
		<form method="post" onSubmit={onSubmit}>
			<label>
				Username
				<input name="username" type="text" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button type="submit">Sign in</button>
		</form>
	);
}
