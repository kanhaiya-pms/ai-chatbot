import React from 'react';

declare global {
    interface Window {
        grecaptcha: any;
    }
}
interface ChatProps {
    theme?: {
        bgColor?: string;
        primaryColor?: string;
    };
}
declare const ChatBot: React.FC<ChatProps>;

export { ChatBot as default };
