export const Skeleton = () => (
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
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </tbody>
    </table>
  </div>
);

const SkeletonRow = () => (
  <tr className="bg-white border-b-ui-table border-1">
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
    <td className="p-2 border-r-ui-table border-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </td>
  </tr>
);
