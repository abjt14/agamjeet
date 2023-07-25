import Image from "next/image";
import styles from "./about.module.css";
import clsx from "clsx";

export default function About() {
  return (
    <main className="flex flex-col items-start justify-between gap-8 w-full">
      <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-between items-start sm:items-center">
        <div
          className={clsx(
            "image-wrapper flex-1 rounded-full border-2 dark:border border-cinder-900 dark:border-macaroni-and-cheese-300 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-transparent via-macaroni-and-cheese-200 to-transfrom-transparent dark:from-transparent dark:via-cinder-900 dark:to-transparent",
            styles.fadein
          )}
        >
          <Image src="/me.png" alt="me" width={589} height={608} className="grayscale max-w-[10rem] sm:max-w-full" />
        </div>
        <div
          className={clsx(
            "flex-[3] md:flex-[4] text-cinder-900 dark:text-macaroni-and-cheese-300 text-2xl font-medium dark:font-normal sm:text-3xl font-ebgaramond",
            styles.fadein
          )}
          style={{
            animationDelay: "100ms"
          }}
        >
          Hi! I am Agamjeet Singh, a 17 year old math enthusiast living in Ramagundam, India.
        </div>
      </div>
      <div className="block sm:flex flex-col sm:flex-row gap-8 md:gap-12 justify-between items-start sm:items-center">
        <div className="flex flex-col gap-8">
          <p
            className={ styles.fadein }
            style={{
              animationDelay: "200ms"
            }}
          >
            I have been doing Math Olympiads for the past few years and am now a 2023 IMOTCer. Besides that, I love making mock exams and am the founder of the Math Olympiad Mock Club (MOMC). I am also one of the organisers of the Sophie Fellowship.
          </p>
          <p
            className={ styles.fadein }
            style={{
              animationDelay: "300ms"
            }}
          >
            Math Olympiads intrigue me a lot. I am particularly passionate about Number Theory and Functional Equations. I also find combinatorics to be quite fascinating. Apart from just solving problems, I have a burning desire to make my own. My problems that have been featured in math contests are <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2525153p21435358">GAMO 2021 P1</a>, <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2525165p21435474">GAMO 2021 P6</a>, <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2596328p22392059">GIMO 2021 P4</a>, <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2651329p22951954">OIMC 2021 P4</a>, <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2845178p25210844">GJMO 2022 P5</a>, <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h2845174p25210807">GAMO 2022 P3</a>, and <a target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://artofproblemsolving.com/community/c6h3080410p27825217">LMAO Revenge 2023 P1</a>.
          </p>
          <p
            className={ styles.fadein }
            style={{
              animationDelay: "400ms"
            }}
          >
            Whilst preparing for IOQM, I couldn&#39;t find a good source for mock exams. So I made my own mocks by collecting problems from past computational math contests such as AMCs and AIMEs. I thought it would be really cool if my friends also tried the same mock tests that I made for myself. So I established an IOQM Mocks Discord server named Math Olympiad Mock Club in June 2022. After the first season of MOMC, I have decided that it would be proper to open the mocks to the public.
          </p>
          <p
            className={ styles.fadein }
            style={{
              animationDelay: "500ms"
            }}
          >
            In my free time, I love playing electric guitar, which I started learning at 11. I have been doing the Rock and Pop course from Trinity College of London for the past few years and will complete it in the coming months. I also play the synthesizer, which I started learning at the age of 5. I have performed many times in school orchestras, and I was the youngest member of the group. Besides music, I also enjoy watching movies and anime.
          </p>
          <p
            className={ styles.fadein }
            style={{
              animationDelay: "600ms"
            }}
          >
            Thank you for reading! If you want to work together or talk about Math, Music, or Anime, you can shoot me a message on <a className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto" href="https://www.linkedin.com/in/agamjeet-singh/" target="_blank">Linkedin</a>.
          </p>
        </div>
      </div>
    </main>
  )
}