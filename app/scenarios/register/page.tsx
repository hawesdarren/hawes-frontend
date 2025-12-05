'use client'

import { useState } from "react";
import Header from '../../components/header'
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation';

export default function Register() {
  // Router
  const router = useRouter();

  //Email state
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);

  //Password state
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  //Confirm Password state
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState<boolean>(false);
  // Registration state
  const [registrationError, setRegistrationError] = useState<string>('');

  //Submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Error message mapping function
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      INVALID_EMAIL: "Please enter a valid email address.",
      EMAIL_ALREADY_REGISTERED: "This email address is already registered. Please try logging in or use a different email.",
      PASSWORD_COMPLEXITY: "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.",
      COMMON_PASSWORD: "This password is too common and easy to guess. Please choose a more secure password.",
      REGISTRATION_FAILURE: "We couldn't complete your registration at this time. Please try again later.",
      PASSWORDS_DONT_MATCH: "The passwords you entered don't match. Please make sure both password fields are identical."
    };
    
    return errorMessages[errorCode] || errorCode || "An unexpected error occurred. Please try again.";
  };

  //Validation functions

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return "Email is required.";
    } else if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    if (!value) {
      return "Password is required.";
    } else if (!passwordRegex.test(value)) {
      return "Password must be at least 7 characters, contain 1 upper case character and 1 number.";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) {
      setPasswordError(validatePassword(value));
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordTouched) {
      setConfirmPasswordError(validateConfirmPassword(value));
    }
  }; 
  
  const register = async () => {
    // Registration logic here
    let payLoad = {
      email: email,
      password: password,
      renteredPassword: confirmPassword
    }
    console.log("Registering user with payload:", payLoad);
    // Call Registration API here
    let result = await fetch('/api/authentication/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    });
    let data = await result.json();
    console.log("Registration response:", data);
    // Check for successful registration and handle accordingly
    if(result.ok && data.success === true) {
      // Store token
      localStorage.setItem('token', data.token);
      // Navigate to 2fa setup or login page
      router.push('/scenarios/two-factor-setup');
    }
    else {
      // Show  error message
      console.error("Registration failed:", data.error);
      // Map error messages to user-friendly messages if needed
      let userErrorMessage = getErrorMessage(data.error);
      setRegistrationError(userErrorMessage || "Registration failed. Please try again.");
    }
  };

  //Submitting functions
  const handleSubmit = (e: React.FormEvent) => {
    console.log("Submitting registration form");
    e.preventDefault();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (
      !validateEmail(email) &&
      !validatePassword(password) &&
      !validateConfirmPassword(confirmPassword)
    ) {
      setIsSubmitting(true);
      // Form submission logic here
      setTimeout(() => {
        // Call Registration API here
        register();
        setIsSubmitting(false);
      });
    }
  }

  return (
  <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">

  <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit">
        
        <form className="flex flex-col gap-2 w-80 sm:w-140">
            <FieldSet>
              <FieldLegend className="text-(--text-color)">Register</FieldLegend>
              <FieldDescription>Please fill in the form to create an account.</FieldDescription>
              <FieldGroup>
                <Field>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FieldLabel htmlFor="email" className="sm:min-w-36 sm:max-w-48">Email</FieldLabel>
                    <Input 
                      id="email" 
                      type="email" 
                      className="sm:flex-1" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={handleEmailChange} 
                      onBlur={handleEmailBlur} />
                  </div>    
                  {emailTouched && emailError && <FieldError>{emailError}</FieldError>}
                </Field>
                <Field>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">                
                    <FieldLabel htmlFor="password" className="sm:min-w-36 sm:max-w-48">Password</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password} 
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      className="sm:flex-1" 
                      placeholder="Enter password" />
                  </div>
                  {passwordTouched && passwordError && <FieldError>{passwordError}</FieldError>}
                </Field>
       
                <Field>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FieldLabel htmlFor="confirmPassword" className="sm:min-w-36 sm:max-w-48">Confirm Password</FieldLabel>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      className="sm:flex-1" 
                      placeholder="Confirm password" 
                      value={confirmPassword} 
                      onChange={handleConfirmPasswordChange} 
                      onBlur={handleConfirmPasswordBlur} />
                    </div>
                  
                </Field>
                {confirmPasswordTouched && confirmPasswordError && <FieldError>{confirmPasswordError}</FieldError>}
                <FieldSeparator />
                <div>{registrationError && <FieldError>{registrationError}</FieldError>}</div>
                <Field>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-1/2 mt-4 "
                    onClick={handleSubmit}
                    >
                      {isSubmitting && <Spinner />}
                      Register</Button>
                    <Link href="/" passHref className="w-full sm:w-1/2 mt-4 ">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full"
                    >
                      Cancel</Button>
                    </Link>
                  </div>
                  
                </Field>
                <Field>
                  <Button 
                    type="button"
                    variant="link" 
                    className="w-full mt-4 justify-start text-base text-(--text-color)"
                    onClick={() => router.push('/scenarios/login')}
                    >Already have an account? Login</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
        </form>
        
  </div>
</div>)
    
};