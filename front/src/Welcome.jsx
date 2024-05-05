import './index.css';


function Welcome() {
    return (
        <main className="grid min-h-full place-items-center bg-#213547 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">Welcome</h1>
          <p className="mt-6 text-lg leading-7 text-white-800">Let's start experiment</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/game"
              className="rounded-md bg-indigo-600 px-7 py-5 text-m font-semibold text-white shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start experiment!
            </a>
          </div>
        </div>
      </main>
    )
}
export default Welcome;