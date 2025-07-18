'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function Page(this: any) {

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3">
                <p>Challenge is to use this collapsible</p>
                <div className="grid col-start-2 m-6 gap-6 text-left">
                    <Collapsible>
                        <CollapsibleTrigger>Collapsible trigger</CollapsibleTrigger>
                        <CollapsibleContent>Collapsible content 1</CollapsibleContent>
                        <CollapsibleContent>Collapsible content 2</CollapsibleContent>
                        <CollapsibleContent>Collapsible content 3</CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
            
        </div>

    )}