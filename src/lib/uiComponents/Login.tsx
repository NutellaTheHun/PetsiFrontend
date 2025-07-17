import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { authLogin } from "../../features/login/login/api/auth-login";
import { handleLoginNavigation } from "../../features/login/login/functions/handleLoginNavigation";
import { handleLoginSuccess } from "../../features/login/login/functions/handleLoginSuccess";
import { getToken, getUserRoles } from "../auth";

export function MantineLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getToken();
        const roles = getUserRoles();
        if (token && roles) {
            handleLoginNavigation();
        }
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please fill in both fields.");
            return;
        }

        // API AUTH CALL
        setLoading(true);
        try {
            const result = await authLogin(username, password);
            setLoading(false);
            handleLoginSuccess(result);
            handleLoginNavigation();
            setError("");
        } catch (err) {
            console.error("LOGIN ERROR:", err); // for testing
            setError("Something went wrong.");
            setLoading(false);
        }
    }
    return (
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md" w={400}>
            <TextInput
                label="Username"
                placeholder="Your username"
                required
                radius="md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                radius="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth mt="xl" radius="md" onClick={handleSubmit}>
                Sign in
            </Button>
        </Paper>
    );
}
