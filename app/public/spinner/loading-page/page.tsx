//'use client'

import { Spinner } from "@/components/ui/spinner";

// Force this page to be dynamically rendered on each request
export const dynamic = 'force-dynamic';

//Function to fake data loading
const fakeDataLoading = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 10000);
    });
};

export default async function Page(this: any) {
    await fakeDataLoading();
    
    return (
    <div className="justify-items-center p-10">
        <p>You have successfully loaded this page</p>
    </div>
    )
   
}