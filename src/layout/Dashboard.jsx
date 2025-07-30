import ComingSoon from "../Component/comingSoon";
import Header from "../layout/Header";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:w-[70%] lg:w-[75%]">
      <Header Page="Dashboard" />
      {/* <p className='mt-12 mb-3'>Withdraw funds from your investment account</p> */}
      <section className="mt-15 flex justify-center">
       <ComingSoon/>
      </section>
    </div>
  );
}
