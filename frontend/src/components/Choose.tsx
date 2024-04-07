import React from 'react'

const Choose: React.FC = () => {
    return (
        <div className="bg-black md:mt-10 mt-5">

            <section id="features"
                className="relative block px-6 py-10 md:py-20 md:px-10  border-t border-b border-neutral-900 bg-neutral-900/30">


                <div className="relative mx-auto max-w-5xl text-center">
                    <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
                        Why choose us
                    </span>
                    <h2
                        className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                        Get your Internship now!
                    </h2>
                    <p
                        className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
                        Showcase your accomplishment and newly acquired skills with a certificate upon successful completion of the program.
                    </p>
                </div>


                <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md border border-yellow-300 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text border-yellow-300 bg-yellow-300  mx-auto flex h-12 w-12 items-center justify-center rounded-md border "
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>

                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-400">Gain Industry-Level Experience</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">Our internship programs are designed to offer you real-world, hands-on experience in your chosen field, giving you a valuable edge in the competitive job market.
                        </p>
                    </div>


                    <div className="rounded-md border border-yellow-300 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text mx-auto border-yellow-300 bg-yellow-300 flex h-12 w-12 items-center justify-center rounded-md border "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg>

                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-400">Explore Diverse Opportunities</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">We connect you with internships across various industries and companies, allowing you to discover your passions and interests.
                        </p>
                    </div>


                    <div className="rounded-md border border-yellow-300 border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text mx-auto border-yellow-300 bg-yellow-300 flex h-12 w-12 items-center justify-center rounded-md border "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
</svg>

                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-400">Develop Career-Ready Skills</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                        Gain valuable skills sought after by employers, including communication, teamwork, problem-solving, and technical expertise.
                        </p>
                    </div>


                </div>

                
              

            </section>
        </div>
    )
}

export default Choose