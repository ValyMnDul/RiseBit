import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function infoLayout({children}:{children:React.ReactNode}){
    return(
        <div className="h-screen flex flex-col justify-between">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}