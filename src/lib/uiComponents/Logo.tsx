import { Avatar } from "@mantine/core";

type Props = {
    size?: number;
    radius?: number;
};
export function Logo({ size, radius }: Props) {
    return (
        <Avatar
            src="src/assets/petsiLogo.jpg"
            size={size}
            radius={radius}
            mx="auto"
        />
    );
}
