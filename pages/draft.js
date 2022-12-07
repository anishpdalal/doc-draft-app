import Head from 'next/head'
export default function Draft() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Head>
        <title>Document Drafting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Doc Draft
        </h1>
      </main>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <div className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Terms</h3>
          <p className="mt-4 text-xl">
            Find in-depth information about Next.js features and its API.
          </p>
        </div>

        <div className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Clauses</h3>
          <p className="mt-4 text-xl">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </div>
      </div>
    </div>
  )
}