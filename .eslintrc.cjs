module.exports = {
    env: {
        node: true, // ← Esto permite process.env
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        'react-app',
        'react-app/jest'
    ],
    rules: {
        'no-undef': 'off' // ← Opcional: desactiva la reglaA
    }
}