import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function infoLayout({children}:{children:React.ReactNode}){
    return(
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    );
} 