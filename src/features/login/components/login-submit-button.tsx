import type React from "react";
import { BaseButton } from "../../../base/components/button/base-button";
import './login-submit-button.css';

type LoginButtonProps = {
    disabled?: boolean;
    style?: React.CSSProperties
}
export function LoginButton({
    disabled = false,
    style
}: LoginButtonProps) {

    return (
        <BaseButton
            text="Submit"
            type='submit'
            disabled={disabled}
            style={style}
            className='login-button'
        />
    );
}

const style: React.CSSProperties = {

}
