import { Component } from "solid-js";
import { iUserTicket } from "../../types";
import { QRCodeSVG } from "solid-qr-code";

const AdminTicketCard: Component<{ ticket: iUserTicket }> = ({ ticket }) => {
  return (
    <div
      class={`rounded p-4 border-primary border-2 relative w-full ${
        ticket.acquired ? "bg-primary-100" : "bg-slate-50"
      }`}
    >
      <p>
        <span class="font-semibold">Id:</span> {ticket.id}
      </p>
      <p>
        <span class="font-semibold">Paid:</span> {ticket.paid_for ? "Yes" : "No"}
      </p>
      <p>
        <span class="font-semibold">Acquired:</span> {ticket.acquired ? "Yes" : "No"}
      </p>
      <p>
        <span class="font-semibold">Numbers:</span> {ticket.numbers}
      </p>
      <QRCodeSVG class="mt-4" value={ticket.numbers} />
    </div>
  );
};

export default AdminTicketCard;
