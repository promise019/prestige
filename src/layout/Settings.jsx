import Header from "../layout/Header";
import ComingSoon from "../Component/comingSoon";

export default function Settings() {
  return (
    <div>
      <Header Page={"Settings"} />
      <section className="mt-15 flex justify-center">
       <ComingSoon/>
      </section>
    </div>
  );
}
