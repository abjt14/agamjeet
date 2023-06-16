import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col items-start justify-between gap-8 w-full">
      <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-between items-start sm:items-center">
        <div className="image-wrapper flex-1 rounded-full border-2 dark:border border-cinder-900 dark:border-macaroni-and-cheese-300 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-transparent via-macaroni-and-cheese-200 to-transfrom-transparent dark:from-transparent dark:via-cinder-900 dark:to-transparent">
          <Image src="/me.png" alt="me" width={589} height={608} className="grayscale max-w-[10rem] sm:max-w-full" />
        </div>
        <div className="flex-[3] md:flex-[4] text-cinder-900 dark:text-macaroni-and-cheese-300 text-2xl font-medium dark:font-normal sm:text-3xl font-ebgaramond">
          Hi! I am Agamjeet Singh, a 17 year old math enthusiast living in Ramagundam, India.
        </div>
      </div>
      <div className="block sm:flex flex-col sm:flex-row gap-8 md:gap-12 justify-between items-start sm:items-center">
        <div className="flex flex-col gap-8">
          <p>
            I have been doing Math Olympiads for the past few years and am now a 2023 IMOTCer. Besides that, I love making mock exams and am the founder of the Math Olympiad Mock Club (MOMC). I am also one of the organisers of the Sophie Fellowship.
          </p>
          <p>
            Math Olympiads intrigue me a lot. I am particularly passionate about Number Theory and Functional Equations. I also find combinatorics to be quite fascinating. Apart from just solving problems, I have a burning desire to make my own. My problems that have been featured in math contests are GAMO 2021 P1, GAMO 2021 P6, GIMO 2021 P4, OIMC 2021 P4, GJMO 2022 P5, GAMO 2022 P3, and LMAO Revenge 2023 P1.
          </p>
          <p>
            Whilst preparing for IOQM, I couldn&#39;t find a good source for mock exams. So I made my own mocks by collecting problems from past computational math contests such as AMCs and AIMEs. I thought it would be really cool if my friends also tried the same mock tests that I made for myself. So I established an IOQM Mocks Discord server named Math Olympiad Mock Club in June 2022. After the first season of MOMC, I have decided that it would be proper to open the mocks to the public.
          </p>
          <p>
            In my free time, I love playing electric guitar, which I started learning at 11. I have been doing the Rock and Pop course from Trinity College of London for the past few years and will complete it in the coming months. I also play the synthesizer, which I started learning at the age of 5. I have performed many times in school orchestras, and I was the youngest member of the group. Besides music, I also enjoy watching movies and anime.
          </p>
          <p>
            Thank you for reading! If you want to work together or talk about Math, Music, or Anime, you can shoot me a message on <a className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-all will-change-auto" href="https://www.linkedin.com/in/agamjeet-singh/" target="_blank">linkedin</a>.
          </p>
        </div>
      </div>
    </main>
  )
}