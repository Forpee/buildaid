import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className='w-screen overflow-x-hidden mr-0 bg-gray-50 pt-4'>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}

export default MyApp;
