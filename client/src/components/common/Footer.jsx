import DelayDisplay from '../latency/Latency';
import Throughput from '../throughput/Throughput';
function Footer() {
    return (
        <footer className="static bottom-1 left-0 flex w-full justify-center sm:fixed">
            <div className="flex p-6 text-center dark:text-neutral-200 flex-col gap-4">

                <Throughput downloadUrl="https://82.130.47.176:3000/file" uploadUrl="https://82.130.47.176:3000/upload"/>
                <DelayDisplay url="http://82.130.47.176" />
                © Author: Du Yutong, Lai Minfei, Han Huazhi

            </div>
        </footer>
    )
}

export default Footer
