import Header from "../layout/Header";
import ComingSoon from "../Component/comingSoon";
import I from "../assets/icon/Frame (12) (1).svg";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";

import { useEffect, useState } from "react";
import InputComponent from "../Component/InputComponent";
import ButtonComponent from "../Component/ButtonComponent";

export default function Withdraw() {
  const [amount, setAmount] = useState();

  return (
    <div className='bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]'>
      <Header Page={"Withdraw Funds"} />
      {/* <p className='mt-12 mb-3'>Withdraw funds from your investment account</p> */}

      <section className="mt-15 flex justify-center">
       <ComingSoon/>
      </section>
      {/* <main className='bg-white p-4 rounded-lg space-y-7 md:w-full'>
        <br />
        <section className='flex space-x-2 bg-gray-100 p-3 rounded-lg '>
          <img src={I} className='w-6' />
          <p className='text-blue-800 space-x-2'>
            <span>Available Balance:</span>
            <span className='text-black font-bold text-lg'>
              &#8358;10,000,000.00
            </span>
          </p>
        </section>

        <section>
          <h1>Amount</h1>
          <InputComponent
            value={amount}
            type={"Number"}
            onChange={(e) => setAmount(e.target.value)}
            className={"w-full p-3 rounded-lg bg-gray-100"}
            placeholder='&#8358; 0.00'
          />
        </section>

        <section className='space-x-2 space-y-2 md:p-2'>
          <h1 className='text-'>Select Withdrawal Method</h1>
          <ButtonComponent className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={paystack} className='w-5 inline-block' />
            <span> Paystack</span>
          </ButtonComponent>
          <ButtonComponent className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={bank} className='w-6 inline-block' />
            <span>Bank Transfer</span>
          </ButtonComponent>
          <ButtonComponent className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={crypto} className='w-6 inline-block' />
            <span>Cryptocurrency</span>
          </ButtonComponent>
        </section>
      </main> */}
    </div>
  );
}
