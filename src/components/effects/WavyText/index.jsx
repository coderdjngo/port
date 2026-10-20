import { Fragment } from "react";
import { Char, ScreenReaderText, Word } from "./styles";

/** 글자 하나하나가 물 위에 떠 있는 듯 시차를 두고 출렁인다 */
export function WavyText({ text }) {
  let charIndex = 0;

  return (
    <>
      <ScreenReaderText>{text}</ScreenReaderText>
      {text.split(" ").map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          {wordIndex > 0 && " "}
          <Word aria-hidden="true">
            {[...word].map((char) => {
              const index = charIndex++;
              return (
                <Char key={index} style={{ "--i": index }}>
                  {char}
                </Char>
              );
            })}
          </Word>
        </Fragment>
      ))}
    </>
  );
}
