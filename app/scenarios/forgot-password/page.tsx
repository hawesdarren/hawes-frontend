'use client'

import { useState, useMemo } from "react";;

import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter, useSearchParams } from 'next/navigation';
import React from "react";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
    // Router
    const router = useRouter();
    //Email state
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [emailTouched, setEmailTouched] = useState<boolean>(false);
    // Submitting state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>('');
    // Success message state
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Handle email input change
    const handleEmailBlur = () => {
        setEmailTouched(true);
    
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    const checkEmailNotBlank = () => {
        if (email.trim() === '') {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError('');
        }
    };

    // Handle form submission

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Reset messages
        setErrorMessage('');
        setSuccessMessage('');
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');
        
        // Check email is not blank
        checkEmailNotBlank();
        if (email.trim() === '') {
            setIsSubmitting(false);
            return;
        }
        
        // Call password reset API
        const response = await fetch('/api/authentication/forgotten/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            setErrorMessage('An error occurred. Please try again.');
        } 

        let result  = await response.json();
        if(result.error === "EMAIL_NOT_FOUND"){
            setErrorMessage('Email address not found.');
        }
        if(result.error === "EMAIL_SENDING_FAILED"){
            setErrorMessage('Failed to send reset email. Please try again later.');
        } 
        if(result.error === "DATABASE_ERROR"){
            setErrorMessage('A server error occurred. Please try again later.');
        }
        if(result.success && !result.error){
            setSuccessMessage('If an account with that email exists, a temporary password has been sent.');
        }
       
        setIsSubmitting(false);
    };

    return (<div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center ">
        <div>
            <FieldSet>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 w-80 sm:w-140 mt-6">
                    <FieldGroup>
                        <Field>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="email" className="sm:min-w-36 sm:max-w-48">Email</FieldLabel>
                                <Input
                                        type="email"
                                        id="email-input"
                                        data-testid="email-input"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        aria-invalid={!!emailError}
                                        aria-describedby="email-error"
                                    />
                                </div>
                                {emailError && (
                                    <FieldError id="email-error" data-testid="email-error">{emailError}</FieldError>
                                )}
                        </Field>
                        <FieldSeparator />
                        <Field>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <Button 
                                    type="submit" 
                                    variant="default"
                                    id="submit-button"
                                    data-testid="submit-button"
                                    className="sm:w-1/2 w-full"
                                    disabled={isSubmitting}
                                    >
                                    {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner className="mr-2" />
                                        Submitting...
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                                </Button>
                                <Button 
                                    variant="outline"
                                    asChild
                                    id="back-to-login-button"
                                    data-testid="back-to-login-button"
                                    className="sm:w-1/2 w-full mt-2 sm:mt-0"
                                    >
                                    <Link 
                                        href ='/scenarios/login'
                                        >
                                        Back to login
                                    </Link>
                                </Button>
                            </div>
                        </Field>
                        <Field>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
                                 id="forgot-password-form-error"
                                 data-testid="forgot-password-form-error">
                                <FieldError>{errorMessage}</FieldError>
                            </div>
                        </Field>
                        <Field>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
                                 id="forgot-password-success-message"
                                 data-testid="forgot-password-success-message">
                                <FieldDescription>{successMessage}</FieldDescription>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </FieldSet>
        </div>
    </div>
    );
}
