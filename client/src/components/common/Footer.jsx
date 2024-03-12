import DelayDisplay from '../latency/Latency';

function Footer() {
    return (
        <footer className="static bottom-1 left-0 flex w-full justify-center sm:fixed">
            <div className="p-4 text-center text-neutral-700 dark:text-neutral-200 flex-col">
                <DelayDisplay url="http://82.130.47.176"/>
                © Author: Du Yutong, Lai Minfei, Han Huazhi
            </div>
        </footer>
    )
}

export default Footer
