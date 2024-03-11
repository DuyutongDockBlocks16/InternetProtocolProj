import FormComponent from "../components/forms/FormComponent"
// import DelayDisplay from '../components/latency/Latency';
import Footer from "../components/common/Footer"
// import Footer from "../components/common/Footer";

function HomePage() {
    return (
        <div className="bg-[url('favicon/pexels-scott-webb-1931143.jpg')] bg-cover flex min-h-screen flex-col items-center justify-center gap-16">
            <div className="flex h-full min-w-full flex-col items-center justify-evenly pt-12 sm:flex-row sm:pt-0">
                <FormComponent />
            </div>

            <div className="flex gap-4 flex-col items-center">
                {/* <DelayDisplay url="http://82.130.47.176"/> */}
                {/* Author: Du Yutong, Lai Minfei, Han Huazhi */}
            </div>
            <Footer />
        </div>
    )
}
export default HomePage
