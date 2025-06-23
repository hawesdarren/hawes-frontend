import Link from "next/link";

export default function Header() {
  
    return (
        <footer className="grid auto-cols-auto gap-4 content-start">
            <div className="col-start-1 col-end-2">
                <p>© 2025 Hawes</p>
            </div>
            <div className="col-start-2 justify-self-center">
                <Link href="mailto:contact@hawes.co.nx">Contact</Link>
            </div>
            <div className="col-start-3 justify-self-end">
                <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
        </footer>
    )};