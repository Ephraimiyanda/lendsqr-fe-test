import { useMemo, useState } from "react";
import Image from "next/image";
import { user } from "@/app/types/userTypes";
import { Chip } from "../common/chip";
import Pagination from "../pagination/pagination";

interface ITableProp {
  data?: user[];
}

const DashTable: React.FC<ITableProp> = ({ data }) => {
  const [filterValue, setFilterValue] = useState({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  });
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Toggle the filter popup
  const toggleFilterPopup = () => setShowFilterPopup(!showFilterPopup);

  // Filtered items based on filter criteria
  const filteredItems = useMemo(() => {
    return data?.filter((item) => {
      return (
        (filterValue.organization === "" ||
          item.organisation.includes(filterValue.organization)) &&
        (filterValue.username === "" ||
          item.userName.includes(filterValue.username)) &&
        (filterValue.email === "" || item.email.includes(filterValue.email)) &&
        (filterValue.dateJoined === "" ||
          item.date.includes(filterValue.dateJoined)) &&
        (filterValue.phoneNumber === "" ||
          item.phoneNumber.includes(filterValue.phoneNumber)) &&
        (filterValue.status === "" || item.status.includes(filterValue.status))
      );
    });
  }, [filterValue, data]);

  // Paginate the filtered items
  const Items = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);
    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const header = [
    { label: "ORGANISATION", width: "17%" },
    { label: "USERNAME", width: "17%" },
    { label: "EMAIL", width: "17%" },
    { label: "PHONE NUMBER", width: "17%" },
    { label: "DATE JOINED", width: "17%" },
    { label: "STATUS", width: "15%" },
  ]?.map((data, idx) => (
    <th key={idx} className="flex-1">
      <button
        onClick={toggleFilterPopup}
        className="table-column-head row-container gap-small align-center justify-center gap-normal"
      >
        <p>{data?.label}</p>
        <Image
          src={"/images/icons/filter.svg"}
          alt="filter"
          width={16}
          height={16}
        />
      </button>
    </th>
  ));

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {Items?.length ? (
            Items.map((item, index) => (
              <tr key={index} className="table-row">
                {/* Table cells */}
              </tr>
            ))
          ) : (
            <tr className="table-row">
              <td colSpan={header.length}>No items found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Pagination
          totalResults={data ? data?.length : 0}
          resultsPerPage={0}
          onPageChange={setPage}
          maxVisiblePages={1}
        ></Pagination>
      </div>
      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="filter-popup">
          <h3>Filter Options</h3>
          <div className="filter-fields">
            <div className="field">
              <label>Organization</label>
              <input
                type="text"
                value={filterValue.organization}
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    organization: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                value={filterValue.username}
                onChange={(e) =>
                  setFilterValue({ ...filterValue, username: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                value={filterValue.email}
                onChange={(e) =>
                  setFilterValue({ ...filterValue, email: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Date Joined</label>
              <input
                type="date"
                value={filterValue.dateJoined}
                onChange={(e) =>
                  setFilterValue({ ...filterValue, dateJoined: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                value={filterValue.phoneNumber}
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="field">
              <label>Status</label>
              <select
                value={filterValue.status}
                onChange={(e) =>
                  setFilterValue({ ...filterValue, status: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>
          </div>
          <div className="filter-actions">
            <button
              onClick={() =>
                setFilterValue({
                  organization: "",
                  username: "",
                  email: "",
                  dateJoined: "",
                  phoneNumber: "",
                  status: "",
                })
              }
            >
              Reset
            </button>
            <button onClick={toggleFilterPopup}>filter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashTable;
