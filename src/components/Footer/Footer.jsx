import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";

function Footer() {
  return (
    <section className="relative rounded-b-2xl overflow-hidden py-10 bg-blue-950 text-white border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="py-5 mb-3 flex gap-4 items-center justify-center font-semibold underline">
          <a
            className="cursor-pointer  hover:text-blue-400 "
            href="https://www.linkedin.com/in/sameersingh19/"
          >
            Admin's Linkedin
          </a>
          <a className="cursor-pointer  hover:text-blue-400 " href="https://github.com/SamVerse">
            Github
          </a>
        </div>
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col items-center justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; Copyright 2024. All Rights Reserved by He who remains.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-300">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className=" text-base hover:text-gray-400" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
