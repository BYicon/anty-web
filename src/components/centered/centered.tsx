"use client";
import { useCommonStore } from "@/stores/useStore";
import { EnumTheme } from "@/shared/enums";

const HeaderSection = () => {
  const { theme } = useCommonStore();

  const features = [
    {
      name: 'Push to deploy',
      description:
        'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
      icon: '',
    },
    {
      name: 'SSL certificates',
      description:
        'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
      icon: 'LockClosedIcon',
    },
    {
      name: 'Simple queues',
      description:
        'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
      icon: 'ArrowPathIcon',
    },
    {
      name: 'Advanced security',
      description:
        'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
      icon: 'FingerPrintIcon',
    },
  ]

  return (
    <div className={`py-24 sm:py-32 ${theme === EnumTheme.Dark ? 'bg-black' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
          <p className={`mt-2 text-pretty text-4xl font-semibold tracking-tight ${theme === EnumTheme.Dark ? 'text-white' : 'text-gray-900'} sm:text-5xl lg:text-balance`}>
            Everything you need to deploy your app
          </p>
          <p className={`mt-6 text-lg/8 ${theme === EnumTheme.Dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
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
