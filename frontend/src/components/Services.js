import React from 'react';

const Services = () => {
  const packages = [
    {
      name: 'Wedding Gold Package',
      price: '$2500',
      features: [
        '6 hours of coverage',
        '300+ professionally edited photos',
        'Cinematic highlight video',
        'Live streaming for one event',
      ],
    },
    {
      name: 'Wedding Diamond Package',
      price: '$4800',
      features: [
        '12 hours of full-day coverage',
        '700+ professionally edited photos',
        'Cinematic highlight video',
        'Full event video',
        'Live streaming for one event',
      ],
    },
    {
      name: 'Wedding Platinum Package',
      price: '$7500',
      features: [
        '20 hours of extended coverage',
        '1000+ professionally edited photos',
        'Cinematic highlight video',
        'Full event video',
        'Live streaming for two events',
      ],
    },
  ];

  return (
    <div className="py-10 px-6 bg-white text-black text-center">
      <h2 className="text-3xl font-bold mb-6">Our Wedding Packages</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-red-100 rounded-2xl shadow-xl w-80 p-6 border border-red-300 hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-red-700 mb-2">{pkg.name}</h3>
            <p className="text-xl font-bold text-gray-800 mb-4">{pkg.price}</p>
            <ul className="text-left list-disc list-inside space-y-1 text-gray-700">
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
