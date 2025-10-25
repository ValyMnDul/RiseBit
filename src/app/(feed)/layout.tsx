import Footer from "@/components/Footer";
export default function infoLayout({children}:{children:React.ReactNode}){
    return(
        <>
            {children}
            <Footer/>
        </>
    );
} 