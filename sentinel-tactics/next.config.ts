/** @type {import('next').NextConfig} */
const nextConfig = {
    // Desativa Turbopack para evitar erros de ESM (como "Unexpected token 'export'")
    // Turbopack ainda é experimental e pode não transpilhar corretamente alguns pacotes
    experimental: {
        turbo: false,
    },
    // Se ainda houver erros de ESM com pacotes específicos, adicione aqui:
    // transpilePackages: ['nome-do-pacote-problematico'], // Ex.: ['axios', 'some-icon-lib']
};

module.exports = nextConfig;
