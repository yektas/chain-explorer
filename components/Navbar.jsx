import { Disclosure, Menu, Transition } from "@headlessui/react";
import { CreditCardIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { shortenAddress } from "../utils";
import Web3 from "web3";
import clsx from "clsx";

const Navbar = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const { ethereum } = window;

    try {
      const web3 = new Web3(ethereum);
      const accounts = await web3.eth.getAccounts();
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "fixed z-40 w-full transition-all ease-in-out duration-200 py-4",
        {
          " bg-dark shadow-[#1b1f2b]/20 shadow-md py-1": scrolled,
        }
      )}
    >
      {({ open }) => (
        <>
          <div className={clsx("px-2 mx-auto max-w-7xl sm:px-6 lg:px-8")}>
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center pl-8 sm:p-0 flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <img
                      className="block w-8 h-8 cursor-pointer lg:hidden"
                      src="/energi-logo-pink.png"
                      alt="Energi logo"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      className="hidden w-8 h-8 cursor-pointer lg:block"
                      src="/energi-logo-pink.png"
                      alt="Energi logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-12">
                  <div className="flex space-x-12">
                    <div
                      className={clsx(
                        "px-3 py-2 font-medium text-2xl border-b-2 border-transparent cursor-pointer",
                        { "text-white": scrolled }
                      )}
                    >
                      EXPLORER
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-4 font-medium sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {connectedAccount ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className={clsx(
                          "flex items-center max-w-xs px-4 py-2 text-white transition rounded-2xl bg-dark hover:bg-gray-600 shadow-lg shadow-gray-400",
                          { "shadow-none ring-gray-600 ring-2": scrolled }
                        )}
                      >
                        <span className="sr-only">Open user menu</span>

                        <div className="pr-2">
                          <CreditCardIcon className="w-6 h-6" />
                        </div>

                        <div className="font-sm">
                          {shortenAddress(connectedAccount)}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 py-1 mt-2 origin-top-right bg-gray-800 rounded-lg shadow-lg w-36  ring-gray-600 ring-2 ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <div className="m-1 rounded-md hover:bg-gray-700 ">
                            <button
                              onClick={() => setConnectedAccount(null)}
                              className="block p-2 text-white "
                            >
                              Disconnect
                            </button>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => connectWallet(true)}
                    className="px-4 py-2 font-semibold transition border-2 rounded-full shadow-lg hover:border-primary hover:text-primary hover:shadow-primary/30 border-primary/80 text-primary/90 shadow-primary/10"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
