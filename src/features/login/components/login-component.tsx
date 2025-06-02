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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in both fields.');
            console.log("LOGIN CALL ERROR");
            return;
        }

        // API AUTH CALL
        console.log("LOGIN CALL");

        setError('success');
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