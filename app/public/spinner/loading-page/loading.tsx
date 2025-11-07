import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  
  return <div className="flex justify-center items-center min-h-screen">
                <Spinner 
                    className="size-20 text-(--text-color)"
                    data-testid="loading-spinner"
                    id="loading-spinner"
                />
         </div>
}