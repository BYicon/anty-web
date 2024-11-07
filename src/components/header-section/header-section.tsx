"use client";
import { useCommonStore } from "@/stores/useStore";
import { EnumTheme } from "@/shared/constant/enums";
import Widget from "@/components/widget/widget";
import Image from "next/image";

const HeaderSection = () => {
  const { theme } = useCommonStore();

  const onWidgetClick = () => {
    window.open("https://x.com/VitalikButerin", "_blank");
  };

  return (
    <div
      className={`relative isolate overflow-hidden py-24 sm:py-32 ${
        theme === EnumTheme.Dark ? "bg-gray-900" : "bg-gray-300"
      }`}
    >
      <div
        className="hidden pointer-events-none sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div
        className="absolute pointer-events-none -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Work with us
          </h2>
          <p
            className={`mt-8 text-pretty text-lg font-medium ${
              theme === EnumTheme.Dark ? "text-gray-600" : "text-gray-900"
            }`}
          >
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold sm:grid-cols-2 md:flex lg:gap-x-10">
            <a href="#">
              Open roles <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="#">
              Internship program <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="#">
              Our values <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="#">
              Meet our leadership <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col-reverse gap-1">
              <dt className={`text-base/7 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-900'}`}>Offices worldwide</dt>
              <dd className="text-4xl font-semibold tracking-tight">12</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className={`text-base/7 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-900'}`}>
                Full-time colleagues
              </dt>
              <dd className="text-4xl font-semibold tracking-tight">300+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className={`text-base/7 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-900'}`}>Hours per week</dt>
              <dd className="text-4xl font-semibold tracking-tight">40</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className={`text-base/7 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-900'}`}>Paid time off</dt>
              <dd className="text-4xl font-semibold tracking-tight">
                Unlimited
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Widget right={100} top={60} className="floating cursor-pointer">
        <Image className="x-icon" src="/images/X.png" alt="logo" width={100} height={100} onClick={onWidgetClick} priority />
      </Widget>
    </div>
  );
};
export default HeaderSection;
