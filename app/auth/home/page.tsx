'use client';
import { useState, useEffect } from "react";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

type Appointment = {
  id: number;
  date: string;
  time: string;
  doctor: string;
};

const Home = () => {
  const [userName, setUserName] = useState<string>("John Doe");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState([
    { title: 'Consultation', description: 'Online consultation with doctors' },
    { title: 'Lab Tests', description: 'Get lab tests at home' },
    { title: 'Mental Health', description: 'Mental health support and therapy' },
  ]);

  useEffect(() => {
    // Simulate fetching data
    setAppointments([
      { id: 1, date: '2025-01-10', time: '10:00 AM', doctor: 'Dr. Smith' },
      { id: 2, date: '2025-01-12', time: '2:00 PM', doctor: 'Dr. Johnson' },
    ]);
  }, []);

  return (
    <div>
      <Header userName={userName} />

      <main className="pt-20 pb-12 px-6">
        <h1 className="text-2xl font-bold mb-6">Active Appointments</h1>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border rounded-lg shadow-md">
              <p className="font-semibold">{appointment.date} - {appointment.time}</p>
              <p className="text-gray-700">Doctor: {appointment.doctor}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-6">What We Offer</h2>
        <div className="grid grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
