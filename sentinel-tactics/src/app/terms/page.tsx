import Link from "next/link";

export const metadata = {
    title: "Termos de Uso | Sentinel Tactics",
    description: "Termos de Uso e Política de Privacidade do Sentinel Tactics",
};

export default function TermsPage() {
    return (
        <main className="max-w-[800px] mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8 text-textSecondary">
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-2">Termos de Uso</h1>
                <p className="text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
            </div>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">1. Aceitação dos Termos</h2>
                <p className="text-sm leading-relaxed">
                    Ao acessar e usar o Sentinel Tactics, você concorda com estes Termos de Uso. Se não concordar com
                    qualquer parte destes termos, não use o serviço.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">2. Descrição do Serviço</h2>
                <p className="text-sm leading-relaxed">
                    O Sentinel Tactics é uma plataforma de analytics e rankings competitivos para League of Legends.
                    Fornecemos estatísticas, histórico de partidas e informações sobre campeões com base em dados
                    públicos disponibilizados pela Riot Games API.
                </p>
                <p className="text-sm leading-relaxed">
                    O Sentinel Tactics não é endossado pela Riot Games e não reflete as opiniões ou visões da Riot Games
                    ou de qualquer pessoa oficialmente envolvida na produção ou gestão de League of Legends.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">3. Uso Permitido</h2>
                <p className="text-sm leading-relaxed">
                    Você concorda em usar o Sentinel Tactics apenas para fins lícitos e de acordo com estes termos. É
                    proibido:
                </p>
                <ul className="text-sm leading-relaxed list-disc list-inside flex flex-col gap-1 ml-2">
                    <li>Usar o serviço de forma que viole leis ou regulamentos aplicáveis</li>
                    <li>Tentar acessar áreas restritas do sistema sem autorização</li>
                    <li>Realizar engenharia reversa ou tentar extrair o código-fonte da plataforma</li>
                    <li>Usar bots ou scripts automatizados para acessar o serviço de forma abusiva</li>
                    <li>Reproduzir, duplicar ou revender qualquer parte do serviço sem permissão</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">4. Propriedade Intelectual</h2>
                <p className="text-sm leading-relaxed">
                    Todo o conteúdo, design e código do Sentinel Tactics são protegidos por direitos autorais. League of
                    Legends e todos os ativos relacionados são propriedade da Riot Games, Inc.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">5. Limitação de Responsabilidade</h2>
                <p className="text-sm leading-relaxed">
                    O Sentinel Tactics fornece informações com base em dados da Riot Games API. Não garantimos a
                    precisão, completude ou atualidade dos dados exibidos. O uso das informações é de inteira
                    responsabilidade do usuário.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">6. Política de Privacidade e Cookies</h2>
                <p className="text-sm leading-relaxed">
                    Coletamos dados de uso para melhorar a experiência do usuário. Utilizamos cookies para:
                </p>
                <ul className="text-sm leading-relaxed list-disc list-inside flex flex-col gap-1 ml-2">
                    <li>Manter preferências de sessão</li>
                    <li>Analisar o tráfego e uso da plataforma</li>
                    <li>Melhorar a performance e experiência do serviço</li>
                </ul>
                <p className="text-sm leading-relaxed">
                    Não vendemos, alugamos ou compartilhamos dados pessoais dos usuários com terceiros para fins
                    comerciais. Você pode recusar o uso de cookies, mas algumas funcionalidades podem ser afetadas.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">7. Dados de Jogadores</h2>
                <p className="text-sm leading-relaxed">
                    Os dados de jogadores exibidos na plataforma são obtidos por meio da Riot Games API e são
                    considerados públicos. Não armazenamos senhas ou informações de conta da Riot Games.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">8. Alterações nos Termos</h2>
                <p className="text-sm leading-relaxed">
                    Reservamos o direito de modificar estes termos a qualquer momento. Alterações entram em vigor
                    imediatamente após a publicação. O uso continuado do serviço após alterações constitui aceitação dos
                    novos termos.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-textPrimary">9. Contato</h2>
                <p className="text-sm leading-relaxed">
                    Dúvidas sobre estes termos podem ser enviadas para nosso suporte através das redes sociais do
                    Sentinel Tactics.
                </p>
            </section>

            <div className="pt-4 border-t border-accent">
                <Link href="/" className="text-highlight hover:opacity-80 transition text-sm">
                    ← Voltar para o início
                </Link>
            </div>
        </main>
    );
}
