import { AppShell, Container, Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getToken, getUserRoles } from "../../../lib/auth";
import { MantineLogin } from "../../../lib/uiComponents/MantineLogin";
import { authLogin } from "./api/auth-login";
import { handleLoginNavigation } from "./functions/handleLoginNavigation";
import { handleLoginSuccess } from "./functions/handleLoginSuccess";

export function LoginPage() {
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
        <AppShell padding="md">
            <AppShell.Main>
                <Container>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ minHeight: "100vh" }}
                    >
                        <MantineLogin />
                    </Flex>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
