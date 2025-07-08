import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Itt csak a JavaScript fájlt adod meg
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],

});
