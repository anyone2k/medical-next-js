"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const AppointmentForm = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HMS_API}/patients/${session.user._id}/appointments`);
        console.log(response)
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="flex gap-4">
      {/* Liste des rendez-vous à gauche */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-white rounded-md border-2 border-grey h-[89vh] overflow-y-auto"
      >
        <ul>
          {appointments.map((appointment, index) => (
            <li
              key={index}
              className={`p-4 cursor-pointer ${
                selectedAppointment && selectedAppointment._id === appointment._id
                  ? "bg-gray-300"
                  : ""
              }`}
              onClick={() => handleAppointmentSelect(appointment)}
            >
              <p>Appointment #{index + 1}</p>
              <p>Date: {new Date(appointment.dayTime).toLocaleString()}</p>
              <p>Duration: {appointment.duration} minutes</p>
              <p>Reason: {appointment.reason}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Détails du rendez-vous sélectionné au centre */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-2/4 bg-white rounded-lg p-6 shadow-md"
      >
        {selectedAppointment ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Détails du Rendez-vous</h2>
            <p><strong>Patient:</strong> {selectedAppointment.patient.fullName.firstName} {selectedAppointment.patient.fullName.lastName}</p>
            <p><strong>Date et Heure:</strong> {new Date(selectedAppointment.dayTime).toLocaleString()}</p>
            <p><strong>Durée:</strong> {selectedAppointment.duration} minutes</p>
            <p><strong>Raison:</strong> {selectedAppointment.reason}</p>
          </>
        ) : (
          <p>Aucun rendez-vous sélectionné.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AppointmentForm;
