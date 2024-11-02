import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { user } from "@/app/types/userTypes";
import { Chip } from "../common/chip";
import Pagination from "../pagination/pagination";

interface ITableProp {
  data?: user[];
  loading: boolean;
}

const DashTable: React.FC<ITableProp> = ({ data, loading }) => {
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
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
  ];
  const renderCell = useCallback((item: user, columnKey: React.Key) => {
    switch (columnKey) {
      case "ORGANISATION":
        return <p className="table-cell-text">{item.organisation}</p>;
      case "USERNAME":
        return <p className="table-cell-text">{item.userName}</p>;
      case "EMAIL":
        return <p className="table-cell-text">{item.email}</p>;
      case "PHONE NUMBER":
        return <p className="table-cell-text">{item.phoneNumber}</p>;
      case "DATE JOINED":
        return (
          <p className="table-cell-text">
            {new Date(item.date).toLocaleDateString()}
          </p>
        );
      case "STATUS":
        return <Chip status={item.status}></Chip>;

      default:
        return "unavailable";
    }
  }, []);
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {header.map((data, idx) => (
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
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="row-container align-center justify-center">
              <td>...loading</td>
            </tr>
          ) : Items?.length ? (
            Items.map((item, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {header.map((column, colIndex) => (
                  <td key={colIndex} className="table-cell">
                    {renderCell(item, column.label)}
                  </td>
                ))}
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
          handleRowsPerPageChange={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[20, 40, 60, 80, 100]}
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
