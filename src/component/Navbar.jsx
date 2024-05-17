

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-around bg-orange-600 text-white py-4">
                <div className="">
                    <span className="font-bold text-xl mx-8">myTaskk</span>
                </div>
                <ul className="flex mx-9 gap-8">
                    <li className="cursor-pointer hover:font-bold transition-all ">Home
                    </li>
                    <li className="cursor-pointer hover:font-bold transition-all ">
                        Your Task
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar