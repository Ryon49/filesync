import Link from "next/link";


export default function NavMenu() {
    return (
        <>
            <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-4 text-white h-full flex flex-col items-center w-72 min-h-screen text-center transition-all duration-300">
                <div className="text-center mb-4 flex flex-col whitespace-nowrap">

                    <button className="ml-auto mb-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -mr-6 -mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <a className="text-2xl font-bold text-center" href="">FileSyc</a>

                </div>
                <div className="whitespace-nowrap">
                    <ul className="flex flex-col space-y-4 list-none">
                        <li className="nav-item px-3">
                            <Link className="nav-link" href="/">
                                <span className="oi oi-home" aria-hidden="true"></span> Home
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="nav-link" href="/upload">
                                <span className="oi oi-home" aria-hidden="true"></span> Upload
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="nav-link" href="/roadmap">
                                <span className="oi oi-home" aria-hidden="true"></span> Roadmap
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <div class="p-4 pr-0 flex-col @(collapseNavMenu ? "" : "p-0")">
    <button class="@(collapseNavMenu ? "block" : "hidden")" @onclick="ToggleNavMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
</div> */}
        </>
    )
}