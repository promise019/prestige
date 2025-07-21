import Header from "../layout/Header";
import InputComponent from "../Component/InputComponent";
import I from "../assets/icon/Frame (12) (1).svg";
import ButtonComponent from "../Component/ButtonComponent";
import bank from "../assets/icon/Bank.svg";
import paystack from "../assets/icon/Paystack.svg";
import crypto from "../assets/icon/Frame (15) (1).svg";
import { useContext, useEffect, useRef, useState } from "react";
import PaystackButton from "../Component/PaystackButton";
import { ToastContainer, toast } from "react-toastify";
import { userDataContext } from "../context/UserDataContext";

const plans = [
  // { plan: 1, amount: 3000, returns: 600, roi: 20 },
  { plan: 2, amount: 6000, returns: 1200, roi: 20 },
  // { plan: 3, amount: 10000, returns: 2000, roi: 20 },
  // { plan: 4, amount: 15000, returns: 3000, roi: 20 },
  // { plan: 5, amount: 25000, returns: 5000, roi: 20 },
  // { plan: 6, amount: 50000, returns: 10000, roi: 20 },
  // { plan: 7, amount: 100000, returns: 20000, roi: 20 },
  // { plan: 8, amount: 200000, returns: 40000, roi: 20 },
  // { plan: 9, amount: 400000, returns: 80000, roi: 20 },
  // { plan: 10, amount: 600000, returns: 120000, roi: 20 },
  // { plan: 11, amount: 1000000, returns: 200000, roi: 20 },
];

export default function Deposit() {
  const [bookingCode, setBookngCode] = useState();
  const [amountError, setAmountError] = useState("");
  const inputRef = useRef(null);
  const { referralData } = useContext(userDataContext);

  function checkAmount() {
    if (bookingCode !== 'Gh-gyyyuygfsrrsde45444wgb9') {
      setAmountError("Incorrect Booking Code");
    } else {
      setAmountError("");
    }
  }

  useEffect(() => {
    checkAmount();
  }, [bookingCode]);

  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]">
      <ToastContainer />
      <Header Page={"Deposit Funds"} />
      <p className="mt-12 mb-3">Add funds to your account</p>
      <main className="bg-white p-4 rounded-lg space-y-5 md:w-full">
        <section className="space-x-2 space-y-2 md:p-2">
          <h1 className="font-bold">Select Payment Method</h1>
          <PaystackButton
            bookingCode={bookingCode}
            email={referralData.email}
            className="p-3 rounded-lg space-x-1 bg-gray-50"
          >
            <img src={paystack} className="w-5 inline-block" />
            <span> Paystack</span>
          </PaystackButton>
          {/* <Button className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={bank} className='w-6 inline-block' />
            <span>Bank Transfer</span>
          </Button> */}
          {/* <ButtonComponent className='p-3 rounded-lg space-x-1 bg-gray-50'>
            <img src={crypto} className='w-6 inline-block' />
            <span>Cryptocurrency</span>
          </ButtonComponent> */}
        </section>

        <section>
          {/* <h1>Amount</h1>
          <InputComponent
            ref={inputRef}
            value={amount}
            type={"Number"}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-3 rounded-lg bg-gray-100 ${
              amount < 3000
                ? "text-red-700 border border-red-700 hover:border-red-700"
                : ""
            }`}
            placeholder='&#8358; 5,000.00'
          /> */}

          <h1>Booking Code</h1>
          <InputComponent
            ref={inputRef}
            value={bookingCode}
            type={"text"}
            onChange={(e) => setBookngCode(e.target.value)}
            className={`w-full p-3 rounded-lg bg-gray-100 ${
             bookingCode !== 'Gh-gyyyuygfsrrsde45444wgb9'
                ? "text-red-700 border border-red-700 hover:border-red-700"
                : ""
            }`}
            placeholder="&#8358; 6,000.00"
          />
          <p className="text-sm text-red-700">{amountError}</p>
          {/* <section className="w-full overflow-x-auto flex p-2 space-x-4">
            {plans.map((i) => (
              <ButtonComponent
                key={i.plan}
                className="p-1.5 border border-gray-400 rounded-2xl "
                // onClick={() => setAmount(i.amount)}
              >
                &#8358;{i.amount}
              </ButtonComponent>
            ))}
          </section> */}
        </section>

        <section className="flex space-x-2 bg-gray-100 p-2 rounded-lg ">
          <img src={I} className="w-6" />
          <p className="text-blue-800">
            Payment with booking code &#8358;5,000
            <br />
            Payment without booking code &#8358;6,000
          </p>
        </section>
      </main>
    </div>
  );
}
