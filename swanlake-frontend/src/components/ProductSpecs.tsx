// import React from 'react';
// import {Cpu, Battery, Smartphone, HardDrive} from 'lucide-react';

// interface ProductSpecsProps {
//     specs?: {
//         [p: string]: any;
//     };
// }
// export default function ProductSpecs({specs}: ProductSpecsProps) {
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-bold dark:text-white mb-4">Specifications</h3>

//             <div className="space-y-4">
//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//                         <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
//                     </div>
//                     <div>
//                         <h4 className="font-semibold dark:text-white">Processor</h4>
//                         <p className="text-gray-600 dark:text-gray-300">A17 Pro chip</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">6-core CPU with 2 performance and 4
//                             efficiency cores</p>
//                     </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//                         <HardDrive className="w-5 h-5 text-green-600 dark:text-green-400"/>
//                     </div>
//                     <div>
//                         <h4 className="font-semibold dark:text-white">Storage</h4>
//                         <p className="text-gray-600 dark:text-gray-300">256GB / 512GB / 1TB</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">NVMe storage</p>
//                     </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//                         <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
//                     </div>
//                     <div>
//                         <h4 className="font-semibold dark:text-white">Display</h4>
//                         <p className="text-gray-600 dark:text-gray-300">6.7" Super Retina XDR</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">ProMotion technology with adaptive
//                             refresh rate up to 120Hz</p>
//                     </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
//                         <Battery className="w-5 h-5 text-yellow-600 dark:text-yellow-400"/>
//                     </div>
//                     <div>
//                         <h4 className="font-semibold dark:text-white">Battery</h4>
//                         <p className="text-gray-600 dark:text-gray-300">4422 mAh</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Up to 29 hours video playback</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React from 'react';
import { Cpu, Battery, Smartphone, HardDrive } from 'lucide-react';

interface ProductSpecsProps {
  specs: {
    processor: string;
    processorDesc: string;
    storage: string;
    storageDesc: string;
    display: string;
    displayDesc: string;
    battery: string;
    batteryDesc: string;
  };
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold dark:text-white mb-4">Specifications</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold dark:text-white">Processor</h4>
            <p className="text-gray-600 dark:text-gray-300">{specs.processor}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{specs.processorDesc}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <HardDrive className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold dark:text-white">Storage</h4>
            <p className="text-gray-600 dark:text-gray-300">{specs.storage}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{specs.storageDesc}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold dark:text-white">Display</h4>
            <p className="text-gray-600 dark:text-gray-300">{specs.display}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{specs.displayDesc}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Battery className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h4 className="font-semibold dark:text-white">Battery</h4>
            <p className="text-gray-600 dark:text-gray-300">{specs.battery}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{specs.batteryDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

