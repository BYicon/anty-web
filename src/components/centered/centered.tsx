"use client";
import { useCommonStore } from "@/stores/useStore";
import { EnumTheme } from "@/shared/enums";

const HeaderSection = () => {
  const { theme } = useCommonStore();

  const features = [
    {
      name: 'Push',
      description:
        'Anyone has the right to step up and be part of the solution to growing the Ethereum community, anywhere in the world..',
      icon: '',
    },
    {
      name: 'VitalikButerin',
      description:
        'One part of L2 scaling is Ethereum increasing its blob capacity. The other part is rollups becoming more data-efficient. Good to see @Starknet rising to the challenge.',
      icon: 'LockClosedIcon',
    },
    {
      name: 'Solana',
      description:
        'Solana is a blockchain built for mass adoption ◎ Fast, composable, green, and globally distributed. X by @SolanaFndn.',
      icon: 'ArrowPathIcon',
    },
    {
      name: 'V',
      description:
        'Argot, a collective of developers who have been working on important Ethereum dev tools we know and love for many years, is in the process of becoming an independent org..',
      icon: 'FingerPrintIcon',
    },
  ]

  return (
    <div className={`py-24 sm:py-32 ${theme === EnumTheme.Dark ? 'bg-black' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">An important step.</h2>
          <p className={`mt-2 text-pretty text-4xl font-semibold tracking-tight ${theme === EnumTheme.Dark ? 'text-white' : 'text-gray-900'} sm:text-5xl lg:text-balance`}>
          Once those three are done, we get universal L1 and L2 light client verification!
          </p>
          <p className={`mt-6 text-lg/8 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Helios (or alternatives) being integrated into user wallets, on mobile and desktop
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className={`text-base/7 ${theme === EnumTheme.Dark ? 'text-white' : 'text-gray-900'}`}>
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="iconfont icon-cloud-arrow-up"></span>
                  </div>
                  {feature.name}
                </dt>
                <dd className={`mt-2 text-base/7 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default HeaderSection;
