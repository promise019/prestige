import Header from "./Header";
import ComingSoon from "../Component/comingSoon";

export default function CheckIns() {
  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]">
      <Header Page="Tasks" />
      {/* <p className='mt-12 mb-3'>Withdraw funds from your investment account</p> */}
      <section className="mt-15 flex justify-center">
       <ComingSoon/>
      </section>
    </div>
  );
}
