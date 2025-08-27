import InputComponent from "../Component/InputComponent";
import I from "../assets/icon/Frame (12) (1).svg";
import close from '../assets/icon/Close.svg'
import paystack from "../assets/icon/Paystack.svg";
import { useContext, useEffect, useRef, useState } from "react";
import PaystackButton from "../Component/PaystackButton";
import { ToastContainer, toast } from "react-toastify";
import { signup_dataContext } from "../context/UserSignUpContext";
const plans = [{ plan: 2, amount: 6000, returns: 1200, roi: 20 }];

export default function Deposit({ deposit, onClick, submitTransaction }) {
  const [bookingCode, setBookngCode] = useState();
  const [amountError, setAmountError] = useState("");
  const inputRef = useRef(null);
  const { userData } = useContext(signup_dataContext);

  function checkAmount() {
    if (bookingCode !== "Gh-gyyyuygfsrrsde45444wgb9") {
      setAmountError("Incorrect Booking Code");
    } else {
      setAmountError("");
    }
  }

  useEffect(() => {
    checkAmount();
  }, [bookingCode]);

  return (
    <div
      className={`${
        deposit ? "block" : "hidden"
      } bg-gray-100 p-3 fixed left-0 top-2 w-screen min-h-screen z-4 md:px-9 lg:px-20 xl:px-70 2xl:px-65`}
    >
      <ToastContainer />

      <header className="fixed top-0 left-0 bg-white p-3 flex w-screen justify-between">
        <h1 className="font-bold text-xl">Secure Slot</h1> 
        <img src={close} className="w-7 h-7 p-1 rounded-full border" onClick={onClick} />
      </header>

      <p className="mt-12 mb-3">
        <section className="w-5 h-5 rounded-full bg-green-700 shadow inline-block mr-2"></section>
        Pay &#8358;4,000 to get started with Prestige
      </p>
      <main className="bg-white p-4 rounded-lg space-y-5 md:w-full">
        <section className="space-x-2 space-y-2 md:p-2">
          <h1 className="font-bold">Select Payment Method</h1>
          <PaystackButton
            bookingCode={bookingCode}
            email={userData.email}
            className="p-3 rounded-lg space-x-1 bg-gray-50"
            onSuccess={submitTransaction}
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

          <h1>Coupon Code</h1>
          <InputComponent
            ref={inputRef}
            value={bookingCode}
            type={"text"}
            onChange={(e) => setBookngCode(e.target.value)}
            className={`w-full p-3 rounded-lg bg-gray-100 ${
              bookingCode !== "Gh-gyyyuygfsrrsde45444wgb9"
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
            Payment with booking code &#8358;3,000
            <br />
            Payment without booking code &#8358;4,000
          </p>
        </section>
      </main>
    </div>
  );
}
