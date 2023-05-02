import { Component } from "solid-js";
// import powerballLogo from "../../assets/powerball_logo.png";
// import cash4LifeLogo from "../../assets/cash4life_logo.png";
// import megaMillionLogo from "../../assets/mega_million_logo.png";
// import floridaLottoLogo from "../../assets/florida_lotto_logo.png";
import { iTicket } from "../../types";

const TicketCard: Component<{ ticket: iTicket }> = ({ ticket }) => {
  return (
    <div class="rounded p-4 border-primary bg-slate-50 border-2 relative w-full">
      <p>Id: {ticket.id}</p>
      <p>Paid: {ticket.paid_for ? "Yes" : "No"}</p>
      <p>Acquired: {ticket.acquired ? "Yes" : "No"}</p>
      <p>Numbers: {ticket.numbers}</p>
    </div>
  );
};

// const getPoolLink = (name: string) => {
//   if (name.toLowerCase().includes("powerball")) return "https://www.flalottery.com/powerball";
//   else if (name.toLowerCase().includes("cash4life")) return "https://www.flalottery.com/cash4Life";
//   else if (name.toLowerCase().includes("mega")) return "https://www.megamillions.com/";
//   return "https://www.flalottery.com/lotto";
// };

// const PoolImage: Component<{ name: string }> = ({ name }) => {
//   if (name.toLowerCase().includes("powerball"))
//     return <img class="h-6 w-fit" src={powerballLogo} />;
//   else if (name.toLowerCase().includes("cash4life"))
//     return <img class="h-8 w-fit" src={cash4LifeLogo} />;
//   else if (name.toLowerCase().includes("mega"))
//     return <img class="h-8 w-fit" src={megaMillionLogo} />;
//   return <img class="h-8 w-fit" src={floridaLottoLogo} />;
// };

export default TicketCard;
