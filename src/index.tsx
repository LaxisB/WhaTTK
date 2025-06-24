/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');

async function main() {
    render(() => <App />, root!);
}

main();
