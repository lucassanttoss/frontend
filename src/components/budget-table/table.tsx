"use client";

import Link from "next/link";

type IBudget = {
  id: number;
  projectId: number;
  code: string;
  fromFTMCode: string;
  fromAmount: string;
  toFTMCode: string;
  toAmount: string;
  typeAction: string;
  createdOn: string;
  createdBy: string;
  UpdateOn: string;
};

export default function BudgetTable({
  budgets,
}: {
  budgets: IBudget[] | undefined;
}) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-ui-table-text">
          No results were found,
          <Link href="/" className="underline">
            {" "}
            return to list
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border-1 border-ui-table">
      <table className="w-full text-sm table-auto text-ui-table-text border-collapse border-hidden">
        <thead className="text-left">
          <tr>
            <th className="p-2 border-r-ui-table border-1">Code</th>
            <th className="p-2 border-r-ui-table border-1">From TFM Code </th>
            <th className="p-2 border-r-ui-table border-1">From Amount</th>
            <th className="p-2 border-r-ui-table border-1">To TFM Code</th>
            <th className="p-2 border-r-ui-table border-1">To Amount</th>
            <th className="p-2 border-r-ui-table border-1">Created On</th>
            <th className="p-2 border-r-ui-table border-1">Created By</th>
            <th className="p-2 border-r-ui-table border-1">Updated On</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.id} className="bg-white border-b-ui-table border-1">
              <td className="p-2 border-r-ui-table border-1">{b.code}</td>
              <td className="p-2 border-r-ui-table border-1">
                {b.fromFTMCode}
              </td>
              <td className="p-2 border-r-ui-table border-1">{b.fromAmount}</td>
              <td className="p-2 border-r-ui-table border-1">{b.toAmount}</td>
              <td className="p-2 border-r-ui-table border-1">{b.typeAction}</td>
              <td className="p-2 border-r-ui-table border-1">
                {new Date(b.createdOn).toLocaleDateString()}
              </td>
              <td className="p-2 border-r-ui-table border-1">{b.createdBy}</td>
              <td className="p-2 border-r-ui-table border-1">
                {new Date(b.UpdateOn).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
