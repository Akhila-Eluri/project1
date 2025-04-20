import React, { useEffect, useState } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="p-6 bg-white text-black text-center">
      <h2 className="text-2xl font-bold mb-4">Our Wedding Packages</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-red-100 rounded-2xl p-4 shadow-md w-72">
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-sm mb-2">{service.description}</p>
            <p className="font-semibold mb-2">{service.price}</p>
            <ul className="text-sm text-left list-disc list-inside">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
