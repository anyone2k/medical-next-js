"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { format, isSameDay } from "date-fns"; // Import helpful date functions

const AppointmentForm = () => {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (status === "authenticated") {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_HMS_API}/patients/${session.user._id}/appointments`
          );
          setAppointments(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching appointments:", error);
          setError("An error occurred while fetching appointments.");
          setLoading(false);
        }
      }
    };
    fetchAppointments();
  }, [session, status]);

  // Function to filter appointments for today
  const filterTodayAppointments = (appointments) => {
    const today = new Date();
    return appointments.filter((appointment) =>
      isSameDay(new Date(appointment.dayTime), today)
    );
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (status === "unauthenticated") return <p>Please log in to view appointments.</p>;

  const todayAppointments = filterTodayAppointments(appointments);

  return (
    <div className="flex gap-4">
      {/* Left: Appointment List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-white rounded-md border-2 border-grey h-[89vh] overflow-y-auto"
      >
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : todayAppointments.length === 0 ? (
          <p>No appointments for today.</p>
        ) : (
          <ul>
            {todayAppointments.map((appointment, index) => (
              <li
                key={appointment._id}
                className={`p-4 cursor-pointer ${
                  selectedAppointment?._id === appointment._id ? "bg-gray-300" : ""
                }`}
                onClick={() => handleAppointmentSelect(appointment)}
                tabIndex={0} // Make it accessible via keyboard navigation
                aria-selected={selectedAppointment?._id === appointment._id}
                role="button"
              >
                <p>Appointment #{index + 1}</p>
                <p>Date: {format(new Date(appointment.dayTime), 'Pp')}</p>
                <p>Duration: {appointment.duration} minutes</p>
                <p>Reason: {appointment.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Center: Selected Appointment Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-2/4 bg-white rounded-lg p-6 shadow-md"
      >
        {selectedAppointment ? (
          <>
    <div className="appointment-details">
      <h2 className="text-2xl font-bold text-center mb-6">Appointment Details</h2>
      
      <p>
        <strong>Patient:</strong> {selectedAppointment.patient?.fullName?.firstName} {selectedAppointment.patient?.fullName?.lastName}
      </p>
      
      <p>
        <strong>Date and Time:</strong> {format(new Date(selectedAppointment.dayTime), 'Pp')}
      </p>
      
      <p>
        <strong>Duration:</strong> {selectedAppointment.duration} minutes
      </p>
      
      <p>
        <strong>Reason:</strong> {selectedAppointment.reason || 'No reason provided'}
      </p>
    </div>
          </>
        ) : (
          <p>No appointment selected.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AppointmentForm;
