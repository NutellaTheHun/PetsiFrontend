import { AppShell, Container, Flex } from "@mantine/core";
import { getUserRoles } from "../../../lib/auth";
import { FeatureDock } from "../../../lib/uiComponents/dock/MantineDock";

export function DockPage() {
    const roles: string[] = getUserRoles();
    if (!roles || roles.length === 0) {
        throw new Error();
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
                        <FeatureDock userRoles={roles} />
                    </Flex>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
