import { getLandlordRentalRequests } from "../_Actions/getLandlordRentalRequests";
import { RentalRequestCard } from "./RentalRequestCard";

export default async function RentalRequestsPage() {
  const requests = await getLandlordRentalRequests();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-900">
        Rental requests
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        {requests.length} request{requests.length !== 1 ? "s" : ""}
      </p>

      {requests.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400">
          No rental requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RentalRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
