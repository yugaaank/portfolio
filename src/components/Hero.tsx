"use client";
import { TypeAnimation } from "react-type-animation";
export default function Hero() {
  return (
    <div className=" w-screen h-[110vh] mb-100 flex justify-center items-center">
      <div className="p-20 w-screen h-screen flex justify-center flex-col  ">
        <div className="text-9xl font-light text-justify ">
          <TypeAnimation
            sequence={[
              "Hello",
              500,
              "Hello There,",
              500,
              "Hello There,\nI'm",
              500,
              "Hello There,\nI'm Yugank Rathore",
              500,
            ]}
            wrapper="span"
            cursor={true}
            className="whitespace-pre-line text-9xl font-light"
          />
        </div>
      </div>
    </div>
  );
}
