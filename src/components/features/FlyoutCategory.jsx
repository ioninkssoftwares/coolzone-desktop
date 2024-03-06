import { Fragment, useRef, useState, useEffect } from "react"
import { Popover, Transition } from "@headlessui/react"
import { FiArrowDown } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
// import { ChevronDownIcon } from "@heroicons/react/solid"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function FlyoutCategory({
    menuTitle = "Hover Popover",
    linksArray = [
        // [[title: string, href: string], ...]
        ["Home", "/"],
        ["About", "/about"],
        ["Blog", "/blog"]
    ]
}) {

    const navigate = useNavigate();
    let timeout // NodeJS.Timeout
    const timeoutDuration = 200

    const buttonRef = useRef(null) // useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    const toggleMenu = (open) => {
        // log the current open state in React (toggle open state)
        setOpenState((openState) => !openState)
        // toggle the menu by clicking on buttonRef
        buttonRef?.current?.click() // eslint-disable-line
    }

    // Open the menu after a delay of timeoutDuration
    const onHover = (open, action) => {
        // if the modal is currently closed, we need to open it
        // OR
        // if the modal is currently open, we need to close it
        if (
            (!open && !openState && action === "onMouseEnter") ||
            (open && openState && action === "onMouseLeave")
        ) {
            // clear the old timeout, if any
            clearTimeout(timeout)
            // open the modal after a timeout
            timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
        }
        // else: don't click! 😁
    }

    const handleClick = (open) => {
        setOpenState(!open) // toggle open state in React state
        clearTimeout(timeout) // stop the hover timer if it's running
    }

    const LINK_STYLES = classNames(
        "py-1 px-1 min-w-[10rem] ",
        "text-white text-start  uppercase ",
        "transition duration-500 ease-in-out",
        "bg-primary-blue hover:text-primary-blue hover:bg-blue-100"
    )
    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            event.stopPropagation()
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    const navigateToProducts = (brand) => {
        const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-');
        navigate(`/products?flyoutOnlyCategory=${encodeURIComponent(formattedBrand)}`);
    };

    return (

        <Popover className="relative mx-auto w-35">
            {({ open }) => (
                <div
                    onMouseEnter={() => onHover(open, "onMouseEnter")}
                    onMouseLeave={() => onHover(open, "onMouseLeave")}
                    className="relative" // Add relative positioning to the container
                >
                    <Popover.Button ref={buttonRef}>
                        <div
                            // style={{ border: "2px solid red" }}
                            className={classNames(
                                open ? "text-blue-800" : "text-gray-800",
                                "bg-primary-blue rounded-md",
                                "flex justify-center relative", // Add relative positioning to the button
                                LINK_STYLES
                            )}
                            onClick={() => handleClick(open)}
                        >
                            <span className="uppercase">
                                {menuTitle}
                            </span>
                        </div>
                    </Popover.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <div className="absolute z-10 w-40 mx-auto top-full"> {/* Position the dropdown below the button */}
                            <div
                            // className={classNames(
                            //     "grid space-y-[2px]",
                            //     "bg-white border-2 border-gray-300 border-solid",
                            //     "divide-y-2 rounded-md text-center"
                            // )}
                            >
                                {linksArray.map(([brand, href]) => (
                                    <Fragment key={"PopoverPanel<>" + brand + href}>
                                        {/* <p className={LINK_STYLES}>
                      {title}
                    </p> */}
                                        <p className={classNames("px-4", LINK_STYLES)}
                                            onClick={() => navigateToProducts(brand)}
                                        // onClick={() => {
                                        //   if (menuTitle === "KITCHEN APPLIANCE") {
                                        //     navigateToProductsCategory(brand);
                                        //   } else {
                                        //     navigateToProducts(menuTitle, brand);
                                        //   }
                                        // }}

                                        >
                                            {brand}
                                        </p>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </Transition>
                </div>
            )}
        </Popover>



    )
}


