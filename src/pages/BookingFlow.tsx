
import React, { useState } from 'react';
import Dashboard from '../components/booking/Dashboard';
import SelectAppointmentType from '../components/booking/SelectAppointmentType';
import ChooseDepartment from '../components/booking/ChooseDepartment';
import PickProvider from '../components/booking/PickProvider';
import SelectDateTime from '../components/booking/SelectDateTime';
import PatientInformation from '../components/booking/PatientInformation';
import ConfirmationScreen from '../components/booking/ConfirmationScreen';
import SuccessScreen from '../components/booking/SuccessScreen';

export type BookingStep = 
  | 'dashboard'
  | 'appointment-type'
  | 'department'
  | 'provider'
  | 'datetime'
  | 'patient-info'
  | 'confirmation'
  | 'success';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  bio: string;
  nextAvailable: string;
  experience: string;
}

export interface BookingData {
  appointmentType?: 'in-person' | 'telehealth';
  department?: string;
  provider?: Provider;
  dateTime?: {
    date: string;
    time: string;
  };
  patientInfo?: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    insurance: string;
  };
}

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('dashboard');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const steps: BookingStep[] = [
      'dashboard',
      'appointment-type', 
      'department',
      'provider',
      'datetime',
      'patient-info',
      'confirmation',
      'success'
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = [
      'dashboard',
      'appointment-type',
      'department', 
      'provider',
      'datetime',
      'patient-info',
      'confirmation',
      'success'
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'dashboard':
        return <Dashboard onNext={nextStep} onGoToStep={goToStep} />;
      case 'appointment-type':
        return (
          <SelectAppointmentType
            onNext={nextStep}
            onBack={prevStep}
            onSelect={(type) => {
              updateBookingData({ appointmentType: type });
              nextStep();
            }}
            selected={bookingData.appointmentType}
          />
        );
      case 'department':
        return (
          <ChooseDepartment
            onNext={nextStep}
            onBack={prevStep}
            onSelect={(department) => {
              updateBookingData({ department });
              nextStep();
            }}
            selected={bookingData.department}
          />
        );
      case 'provider':
        return (
          <PickProvider
            onNext={nextStep}
            onBack={prevStep}
            onSelect={(provider) => {
              updateBookingData({ provider });
              nextStep();
            }}
            selected={bookingData.provider}
            department={bookingData.department}
          />
        );
      case 'datetime':
        return (
          <SelectDateTime
            onNext={nextStep}
            onBack={prevStep}
            onSelect={(dateTime) => {
              updateBookingData({ dateTime });
              nextStep();
            }}
            selected={bookingData.dateTime}
            provider={bookingData.provider}
          />
        );
      case 'patient-info':
        return (
          <PatientInformation
            onNext={nextStep}
            onBack={prevStep}
            onSubmit={(patientInfo) => {
              updateBookingData({ patientInfo });
              nextStep();
            }}
            data={bookingData.patientInfo}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen
            onConfirm={nextStep}
            onBack={prevStep}
            bookingData={bookingData}
          />
        );
      case 'success':
        return (
          <SuccessScreen
            onHome={() => goToStep('dashboard')}
            bookingData={bookingData}
          />
        );
      default:
        return <Dashboard onNext={nextStep} onGoToStep={goToStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cabinet">
      {renderCurrentStep()}
    </div>
  );
};

export default BookingFlow;
