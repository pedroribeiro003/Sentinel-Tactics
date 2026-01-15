export default function HomePage() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-8">

        <h1 className="text-4xl">
          Ranked Performance Intelligence
        </h1>
        <div className="flex flex-row ">
          <div className="flex w-1/3 ">
            <img src="/Logo.png" alt="logo" />
          </div >
          <p className=" text-textPrimary text-lg justify-center items-center w-3/4 flex">
            Sentinel Tactics é uma plataforma de análise competitiva focada em desempenho ranqueado. Reunimos dados confiáveis, histórico consistente e leitura clara de performance para quem valoriza informação precisa.
          </p>
        </div>
      </section>
      <section className="flex flex-col py-4">
        <h1 className="text-4xl">Statistic</h1>
      </section>
    </main>
  );
}