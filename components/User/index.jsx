"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';

function Edituser() {
    const navigate = useNavigate();
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const [formData, setFormData] = useState({
        name: '',
        email: loggedEmail,
        phone_number: '',
        dateOfBirth: '',
        emergency_contact: ''
    });
    const [montrerError, setMontrerError] = useState(false);
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/me', {
                    params: { email: loggedEmail }
                });
                const userData = res.data;

                const formattedDate = userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '';

                setFormData({
                    name: userData.name,
                    email: userData.email,
                    phone_number: userData.telephone,
                    dateOfBirth: formattedDate,
                    emergency_contact: userData.emergency_contact
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [loggedEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[+\d\s-]+$/;
        const today = new Date();
        const birthDate = new Date(formData.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (!nameRegex.test(formData.name)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!phoneRegex.test(formData.phone_number)) {
            console.log("Invalid phone format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (age < 16 || age > 110) {
            console.log("Age not in range");
            setMontrerErrorValidation(true);
            return false;
        }

        setMontrerErrorValidation(false);
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            console.log(formData)
            const res = await axios.put('http://localhost:3010/auth/updatePassword', formData);
            if (res.status === 200) {
                setMontrerSuccess(true);
                setMontrerError(false);
                setTimeout(() => setMontrerSuccess(false), 5000);
                navigate('/');

            } else {
                setMontrerError(true);
                setMontrerSuccess(false);
                setErrorMessage('Failed to update information.');
            }
        } catch (error) {
            console.error("Error:", error);
            setMontrerError(true);
            setMontrerSuccess(false);
            setErrorMessage(error.response?.data?.message || "Assurez-vous d'utiliser votre adresse email.");
            setTimeout(() => setMontrerError(false), 5000);
        }
    };

    return (
        <div>
            {montrerError && (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {errorMessage}
                </div>
            )}
            {montrerSuccess && (
                <div className="alert alert-success">
                    <strong>Success!</strong> Les informations ont été modifiées avec succès.
                </div>
            )}
            {montrerErrorValidation && (
                <div className="alert alert-danger">
                    <strong>Error!</strong> Les informations saisies sont invalides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Changer vos informations</h2>
                <br />
                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="name">Nom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            placeholder={formData.name || 'Votre nom complet'}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputEmail1">Adresse Email:</Form.Label>
                        <Form.Control
                            type="email"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="exemple@gmail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="phone_number">Numéro de téléphone :</Form.Label>
                        <Form.Control
                            type="text"
                            id="phone_number"
                            placeholder={formData.phone_number || '+1 (123)-456-7890'}
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="dateOfBirth">Date de naissance :</Form.Label>
                        <Form.Control
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="emergency_contact">Numéro de téléphone :</Form.Label>
                        <Form.Control
                            type="text"
                            id="emergency_contact"
                            placeholder={formData.emergency_contact || '+1 (123)-456-7890'}
                            name="emergency_contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>

            </div>

        </div>
    );
}

export default Edituser;
