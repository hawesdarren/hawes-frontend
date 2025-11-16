import { Button } from "@/components/ui/button"

export default function Register() {
  return (  
  <div className="grid grid-rows-[60px_auto_1fr] gap-2 min-h-dvh justify-center">
    <div>Defualt button</div>
    <Button>Default</Button>
    <div>Outline button</div>
    <Button variant="outline">Outline</Button>
    <div>Secondary button</div>
    <Button variant="secondary">Secondary</Button>
    <div>Ghost button</div>
    <Button variant="ghost">Ghost</Button>
    <div>Link button</div>
    <Button variant="link">Link</Button>
    <div>Destructive button</div>
    <Button variant="destructive">Destructive</Button>
  
  </div>
  )  
}