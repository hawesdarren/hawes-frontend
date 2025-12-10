'use client'

import { useState } from "react";;
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation';
import React from "react";

export default function PasswordReset() {
    // Router
    const router = useRouter();

    // New password state
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordError, setNewPasswordError] = useState<string>('');
    const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);

    // Confirm password state
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState<boolean>(false);

    // Submit state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Password reset error state
    const [passwordResetError, setPasswordResetError] = useState<string>('');

    // Passwords match validation
    React.useEffect(() => {
        if (confirmPasswordTouched) {
            if (newPassword !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
            } else {
                setConfirmPasswordError('');
            }
        }
    }, [newPassword, confirmPassword, confirmPasswordTouched]);

    // Validation functions and handlers would go here
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset submission logic here
        resetPassword();

    };

    // Reset password API call
    const resetPassword = async () => {
        // Call to check token has not expired, get new token if required
        // todo: implement token check and refresh logic
        // Implement password reset API call here
        let payload = {
            password: newPassword,
            confirmPassword: confirmPassword,
        };
        try {
            setIsSubmitting(true);
            setPasswordResetError('');
            const response = await fetch('/api/authentication/change/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setPasswordResetError(errorData.message || 'Failed to reset password. Please try again.');
            } 
            else {
                // If response 200 but error in the payload
                const payload = await response.json();
                if (payload.error) {
                    setPasswordResetError(payload.error);
                    return;
                }
                // On successful password reset, redirect to landing page
                router.push('/scenarios/secure-landing');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setPasswordResetError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="grid grid-rows-[60px_auto_1fr] gap-6 min-h-dvh justify-center">
            <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 w-80 sm:w-140">
                <FieldSet>
                    <FieldLegend className="text-(--text-color)">Password reset</FieldLegend>
                    <FieldDescription>Please enter your new password.</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="newPassword" className="sm:min-w-36 sm:max-w-48">
                                    New password
                                </FieldLabel>
                                <FieldContent>
                                    <Input 
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onBlur={() => setNewPasswordTouched(true)}
                                        />
                                </FieldContent>
                            </div>    
                            {newPasswordError && newPasswordTouched && (
                                <FieldError>{newPasswordError}</FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                    <FieldGroup>
                        <Field>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="confirmPassword" className="sm:min-w-36 sm:max-w-48">
                                    Confirm password
                                </FieldLabel>
                                <FieldContent>
                                    <Input 
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={() => setConfirmPasswordTouched(true)}
                                        />
                                </FieldContent>
                            </div>
                            
                            {confirmPasswordError && confirmPasswordTouched && (
                                <FieldError>{confirmPasswordError}</FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                    <FieldError>{passwordResetError}</FieldError>
                    <FieldSeparator />
                    <FieldGroup>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <Button 
                                variant="default"
                                className="w-full sm:w-1/2 mt-4"
                                onClick={() => {
                                    // Handle password reset submission
                                }}>
                                Reset password
                            </Button>
                            <Link href = "/" passHref className="w-full sm:w-1/2 mt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        >Cancel
                                    </Button>
                            </Link>
                        </div>
                    </FieldGroup>
                </FieldSet>
                </form>
                
                
                
            </div>
        </div>
    );
}