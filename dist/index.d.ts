import * as react_jsx_runtime from 'react/jsx-runtime';

declare global {
    interface Window {
        grecaptcha: any;
    }
}
declare function MyComponent(): react_jsx_runtime.JSX.Element;

export { MyComponent as default };
