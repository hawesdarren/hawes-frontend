'use client'

import { useState } from "react";
import Header from '../../components/header'
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"

export default function Register() {
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

  //Submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
  
  //Submitting functions
  const handleSubmit = (e: React.FormEvent) => {
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
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Registration successful!");
      }, 2000);
    }
  }

  return (
  <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">

  <div className="flex order-1 justify-self-start z-50">
    <Header></Header>
  </div>
  <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit">
        
        <form className="flex flex-col gap-2 w-80 sm:w-120">
            <FieldSet>
              <FieldLegend className="text-(--text-color)">Register</FieldLegend>
              <FieldDescription>Please fill in the form to create an account.</FieldDescription>
              <FieldGroup>
                <Field>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FieldLabel htmlFor="email" className="sm:min-w-24 sm:max-w-38">Email</FieldLabel>
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
                    <FieldLabel htmlFor="password" className="sm:min-w-24 sm:max-w-38">Password</FieldLabel>
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
                    <FieldLabel htmlFor="confirmPassword" className="sm:min-w-24 sm:max-w-38">Confirm Password</FieldLabel>
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
                <Field>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-4 "
                    onClick={handleSubmit}
                    >
                      {isSubmitting && <Spinner />}
                      Register</Button>
                  <Link href="/" passHref>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full mt-4 "
                    >
                      Cancel</Button>
                  </Link>
                </Field>
                <Field>
                  <Button variant="link" className="w-full mt-4 justify-start text-base text-(--text-color)">Already have an account? Login</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
        </form>
        
  </div>
  <div className="flex order-3 items-end p-3">
    Footer    
        
  </div>
   
    </div>
    
    )
    
};