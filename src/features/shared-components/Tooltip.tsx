import { useState } from "react";

interface TooltipProps {
    content: string | string[];
    children: React.ReactNode;
    className?: string;
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const formattedContent = Array.isArray(content)
        ? content.join("\n")
        : content;

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-lg whitespace-pre-line bottom-full left-1/2 transform -translate-x-1/2 mb-1">
                    {formattedContent}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
}
