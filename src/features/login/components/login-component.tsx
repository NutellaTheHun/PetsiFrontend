import React, { useState } from 'react';
import { FlexBox } from '../../../base/components/container/flexbox/flex-box';
import { LoginPasswordField } from './login-password-field';
import { LoginButton } from './login-submit-button';
import { LoginUsernameField } from './login-username-field';
import { LoginWindow } from './login-window';

export function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("LOGIN CALL");

        if (!username || !password) {
            setError('Please fill in both fields.');
            console.log("LOGIN CALL ERROR");
            return;
        }

        // API AUTH CALL
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
                return;
            }

            const data = await response.json();

            console.log("LOGIN SUCCESS", data);

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('roles', JSON.stringify(data.role));

            setError('');
        } catch (err) {
            console.error('LOGIN ERROR:', err);
            setError('Something went wrong.');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <LoginWindow>
                <FlexBox direction='column' gap='1rem'>
                    <label>Login</label>
                    <LoginUsernameField value={username} onChange={(e) => setUsername(e.target.value)} />
                    <LoginPasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
                    <LoginButton />
                    <div style={{ minHeight: '1.5rem', color: 'red' }}>
                        {error}
                    </div>
                </FlexBox>
            </LoginWindow>
        </form>

    );
}