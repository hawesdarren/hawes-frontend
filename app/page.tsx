'use client';

import Image from "next/image";
import HamburgerMenu from "./components/hamburgerMenu";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[minmax(auto,220)_auto_auto_1fr] gap-4 min-h-dvh ">
        
        <div className="grid order-1 grid-cols-[minmax(auto,60)_1fr_minmax(auto,60)]">
            <div className="col-start-1 col-end-2 place-items-start z-50 p-3 ">
                <HamburgerMenu ></HamburgerMenu>
                
            </div>
            
            <div className="justify-self-center p-5">
                        <Image 
                            data-testid="logo"
                            src="/hawesLogo.svg"
                            alt="Hawes logo"
                            width={200}
                            height={200}
                        />
                    </div>
            
        </div>
        
            
            <div className=" order-2 justify-self-center p-3">
                <p>
                Maecenas sit amet ipsum feugiat, eleifend justo dictum, tristique odio. Aenean lacus nibh, ornare quis ante ac, iaculis pretium arcu. Donec pellentesque erat in velit semper suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque lobortis consequat nisi. Vestibulum vitae lectus auctor, pharetra tellus ac, lacinia ipsum. Nunc sed accumsan orci, quis luctus elit. In quis tristique nunc. Donec fermentum tempor leo. Praesent nec vehicula mi, vitae commodo leo. Fusce rhoncus est sit amet erat dapibus dignissim. Nunc venenatis tempus metus in tempus. Donec augue dolor, interdum ac porttitor ac, tempor at turpis. Nam sodales ipsum a turpis efficitur tristique.
                </p>
            </div>
            <div className="order-3 justify-self-center p-3">
                <p>
                Maecenas sit amet ipsum feugiat, eleifend justo dictum, tristique odio. Aenean lacus nibh, ornare quis ante ac, iaculis pretium arcu. Donec pellentesque erat in velit semper suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque lobortis consequat nisi. Vestibulum vitae lectus auctor, pharetra tellus ac, lacinia ipsum. Nunc sed accumsan orci, quis luctus elit. In quis tristique nunc. Donec fermentum tempor leo. Praesent nec vehicula mi, vitae commodo leo. Fusce rhoncus est sit amet erat dapibus dignissim. Nunc venenatis tempus metus in tempus. Donec augue dolor, interdum ac porttitor ac, tempor at turpis. Nam sodales ipsum a turpis efficitur tristique.
                </p>
            </div>
            <div className="order-4 justify-self-left self-end p-3">
                <Footer />
            </div>
  
        
        
    </div>
  );
}
