'use client'

import { useState } from "react";
import Header from '../../components/header'
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,
        FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"

export default function Login() {

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
        
        let result = await fetch('https://192.168.1.137:443/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json()) 
        console.log(result); 
    }

    return (
        <div>
            <Header />
            <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <FieldSet>
                        <FieldGroup>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <FieldContent>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    aria-invalid={!!emailError}
                                    aria-describedby="email-error"
                                />
                            </FieldContent>
                            {emailError && (
                                <FieldError id="email-error">{emailError}</FieldError>
                            )}
                        </FieldGroup>

                        <FieldGroup>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <FieldContent>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}    
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    aria-invalid={!!passwordError}
                                    aria-describedby="password-error"
                                />
                            </FieldContent>
                            {passwordError && (
                                <FieldError id="password-error">{passwordError}</FieldError>
                            )}
                        </FieldGroup>
                        <FieldSeparator />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4"
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
                        <Link href = "/" passHref>
                            <Button
                              variant="outline"
                              className="w-full mt-4"
                              >Cancel
                            </Button>
                        </Link>
                        
                    </FieldSet>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link href="/scenarios/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}