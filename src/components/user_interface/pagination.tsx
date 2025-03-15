const Pagination = () => (
  <div className="flex justify-end space-x-2">
    <span className="text-black font-[Kanit]-300">Per Page:</span>
    <select className="border p-1 rounded-md">
      <option>10</option>
      <option>20</option>
      <option>50</option>
    </select>
  </div>
);
export default Pagination;
