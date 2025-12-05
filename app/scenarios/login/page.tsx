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

export default function Login() {
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

    //Submit state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Login error state
    const [loginError, setLoginError] = useState<string>('');

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
        if (!value) {
            return "Password is required.";
        }
        return "";
    };

    const handlePasswordBlur = () => {
        setPasswordTouched(true);
        setPasswordError(validatePassword(password));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (passwordTouched) {
            setPasswordError(validatePassword(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));
        setEmailTouched(true);
        setPasswordTouched(true);

        if (!validateEmail(email) && !validatePassword(password)) {
            setIsSubmitting(true);
            // Login logic here
            login().finally(() => {
                setIsSubmitting(false);
            });
        }
    };

    const login = async () => {
        // Implement login logic here
        // Create the request payload
        let payload = {
            email: email,
            password: password
        };
        
        let result = await fetch(`/api/authentication/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json()) 
        if(!result.ok){
            // Handle error response if not 200 OK
            setLoginError('Unexpected error. Please try again.');
            return;
        }
        // Check response is successful
        if (result.success && result.token !== null) {
            // Handle successful login
            console.log('Login successful:', result);
            if(result.token !== null){
                // Store token in local storage
                localStorage.setItem('token', result.token);
                console.log('Token stored in local storage');
            }
            // Navigate based on response flags
            if(result.tempPassword === true){
                // Redirect to password change page
                router.push('/scenarios/change-password');
            }
            if(result.tfaEnabled === true){
                // Redirect to TFA verification page
                router.push('/scenarios/tfa-verify');
            }    
        }
        else {
            // Handle login failure
            console.log('Login failed:', result.message);
            setLoginError('Invalid email or password. Please try again.');
        }
        
    }

    return (
        <div>
            
            <div className="flex order-2  flex flex-col justify-self-center p-3 w-fit">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 w-80 sm:w-140">
                    <FieldSet>
                        <FieldLegend className="text-(--text-color)">Login</FieldLegend>
                        <FieldDescription>Please enter your credentials to log in.</FieldDescription>
                        <FieldGroup>
                            <Field>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="email" className="sm:min-w-36 sm:max-w-48">Email</FieldLabel>
                                <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        aria-invalid={!!emailError}
                                        aria-describedby="email-error"
                                    />
                                </div>
                                {emailError && (
                                    <FieldError id="email-error">{emailError}</FieldError>
                                )}
                            </Field>
                            
                        </FieldGroup>

                        <FieldGroup>
                            <Field>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <FieldLabel htmlFor="password" className="sm:min-w-36 sm:max-w-48">Password</FieldLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}    
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    aria-invalid={!!passwordError}
                                    aria-describedby="password-error"
                                />
                                </div>
                                {passwordError && (
                                    <FieldError id="password-error">{passwordError}</FieldError>
                                )}    
                            </Field>
                            
                        </FieldGroup>
                        <FieldSeparator />
                        <FieldError>
                            {loginError}
                        </FieldError>
                        
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-1/2 mt-4"
                                aria-busy={isSubmitting}
                                aria-disabled={isSubmitting}
                                >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner className="mr-2" />
                                        Logging in...
                                    </div>
                                ) : (
                                    "Login"
                                )}
                                </Button>
                                <Link href = "/" passHref className="w-full sm:w-1/2 mt-4">
                                    <Button
                                    variant="outline"
                                    className="w-full"
                                    >Cancel
                                    </Button>
                                </Link>
                            </div>
                        
                        <Field>
                            <Button 
                            type="button"
                            variant="link" 
                            className="w-full mt-4 justify-start text-base text-(--text-color)"
                            onClick={() => router.push('/scenarios/register')}
                            >Don't have an account? Register</Button>
                        </Field>
                    </FieldSet>
                </form>
                
            </div>
        </div>
    );
}