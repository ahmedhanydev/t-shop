import React from "react";

const About = () => {
  return (
    <div className="container mx-auto my-16">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl pb-10">Our Story</h1>
        <p className="text-lg text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse dolor
          reprehenderit, cumque ex earum, sunt asperiores non dolore eum unde
          suscipit recusandae aperiam enim incidunt, voluptates ut iste. Enim,
          officia!
        </p>
      </div>
      <div className="mt-20">
        <h2 className="font-bold text-3xl text-center pb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 my-10 gap-10 lg:grid-cols-3">
          <div className=" flex flex-col bg-gray-200 rounded-3xl justify-center gap-2 py-10 items-center border-2">
            <span className="bg-violet-500 flex justify-center items-center w-20 h-20 rounded-full">
              <i
                className="pi pi-dollar  "
                style={{ fontSize: "2rem", color: "white" }}
              ></i>
            </span>
            <p className="font-semibold text-2xl">Easy Payment</p>
          </div>
          <div className=" flex flex-col bg-gray-200 rounded-3xl justify-center gap-2 py-10 items-center border-2">
            <span className="bg-violet-500 flex justify-center items-center w-20 h-20 rounded-full">
              <i
                className="pi pi-shopping-cart  "
                style={{ fontSize: "2rem", color: "white" }}
              ></i>
            </span>
            <p className="font-semibold text-2xl">Easy Shopping</p>
          </div>
          <div className=" flex flex-col bg-gray-200 rounded-3xl justify-center gap-2 py-10 items-center border-2">
            <span className="bg-violet-500 flex justify-center items-center w-20 h-20 rounded-full">
              <i
                className="pi pi-bolt  "
                style={{ fontSize: "2rem", color: "white" }}
              ></i>
            </span>
            <p className="font-semibold text-2xl">Fast Shopping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
