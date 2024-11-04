import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { user } from "@/app/types/userTypes";
import { Chip } from "../common/chip/chip";
import Pagination from "../pagination/pagination";
import Link from "next/link";
import "../table/tableStyles.scss";
import { useRouter } from "next/navigation";
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
  const [openDialogRowId, setOpenDialogRowId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        openDialogRowId !== null &&
        !event.target.closest(".dialog-content")
      ) {
        setOpenDialogRowId(null);
      }
    };

    // Only add the event listener if a dialog is open
    if (openDialogRowId !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove the listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDialogRowId]);

  //set date format
  const date = (timestamp: string) => {
    return new Date(timestamp);
  };

  //date options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // Set timezone to UTC
  };

  //handle open dialog box
  //@ts-ignore
  const handleOpenDialog = (rowId) => {
    setOpenDialogRowId(rowId);
  };
  //handle close dialog box
  const handleCloseDialog = () => {
    setOpenDialogRowId(null);
  };
  // Toggle the filter popup
  const toggleFilterPopup = () => setShowFilterPopup(!showFilterPopup);

  // Filtered items based on filter criteria
  const filteredItems = useMemo(() => {
    return data?.filter((item) => {
      return (
        (filterValue.organization === "" ||
          item.organisation
            .toLocaleLowerCase()
            .includes(filterValue.organization.toLocaleLowerCase())) &&
        (filterValue.username === "" ||
          item.userName
            .toLocaleLowerCase()
            .includes(filterValue.username.toLocaleLowerCase())) &&
        (filterValue.email === "" ||
          item.email
            .toLocaleLowerCase()
            .includes(filterValue.email.toLocaleLowerCase())) &&
        (filterValue.dateJoined === "" ||
          item.date
            .toLocaleLowerCase()
            .includes(filterValue.dateJoined.toLocaleLowerCase())) &&
        (filterValue.phoneNumber === "" ||
          item.phoneNumber
            .toLocaleLowerCase()
            .includes(filterValue.phoneNumber.toLocaleLowerCase())) &&
        (filterValue.status === "" ||
          item.status.toLocaleLowerCase() ===
            filterValue.status.toLocaleLowerCase())
      );
    });
  }, [filterValue, data]);

  // Paginate the filtered items
  const Items = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);
    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  //table header options
  const header = [
    { label: "ORGANISATION", width: "17%" },
    { label: "USERNAME", width: "17%" },
    { label: "EMAIL", width: "17%" },
    { label: "PHONE NUMBER", width: "17%" },
    { label: "DATE JOINED", width: "17%" },
    { label: "STATUS", width: "15%" },
    { label: "ACTION", width: "5%" },
  ];

  //render table cells
  const renderCell = useCallback(
    (item: user, columnKey: React.Key) => {
      switch (columnKey) {
        case "ORGANISATION":
          return <p className="table-cell-text">{item.organisation}</p>;
        case "USERNAME":
          return (
            <p className="table-cell-text">
              <Link
                className="table-cell-text"
                href={`/dashboard/customers/users/${item._id}`}
              >
                {item.userName}
              </Link>
            </p>
          );
        case "EMAIL":
          return <p className="table-cell-text">{item.email}</p>;
        case "PHONE NUMBER":
          return <p className="table-cell-text">{item.phoneNumber}</p>;
        case "DATE JOINED":
          return (
            <p className="table-cell-text">
              {date(item.date)
                // @ts-ignores
                .toLocaleDateString("en-US", options)
                .replace("/,/", "")}
            </p>
          );
        case "STATUS":
          return <Chip status={item.status}></Chip>;
        case "ACTION":
          return (
            <div className="action-button-wrapper">
              <button onClick={() => handleOpenDialog(item._id)}>
                <Image
                  src="/images/icons/vertical-dot.svg"
                  alt="vertical-dots"
                  width={20}
                  height={20}
                />
              </button>
              {openDialogRowId === item._id && (
                <div
                  className="dialog-overlay shadow"
                  onClick={handleCloseDialog}
                >
                  <div
                    className="dialog-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        router.push(`/dashboard/customers/users/${item._id}`);
                      }}
                    >
                      <Image
                        src="/images/icons/eye.svg"
                        alt="vertical-dots"
                        width={16}
                        height={16}
                      />
                      <p>View Details</p>
                    </button>
                    <button>
                      <Image
                        src="/images/icons/delete-friend.svg"
                        alt="vertical-dots"
                        width={16}
                        height={16}
                      />
                      <p>Blacklist User</p>
                    </button>
                    <button>
                      <Image
                        src="/images/icons/user-tick.svg"
                        alt="vertical-dots"
                        width={16}
                        height={16}
                      />
                      <p>Activate User</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );

        default:
          return "unavailable";
      }
    },
    [openDialogRowId]
  );
  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {header.map((data, idx) => (
                <th
                  key={idx}
                  className={`${
                    data.label === "ACTION" ? "action-cell" : "flex-1 table-th"
                  }`}
                >
                  <button
                    onClick={toggleFilterPopup}
                    className="table-column-head row-container gap-small align-center justify-center gap-normal"
                    disabled={data.label === "ACTION"}
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
              <tr className="row-container align-center justify-center  loading-cell">
                <td>loading...</td>
              </tr>
            ) : Items?.length ? (
              Items.map((item, rowIndex) => (
                <tr key={rowIndex} className="table-row">
                  {header.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${
                        column.label !== "ACTION" && "table-cell"
                      } `}
                    >
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

        {/* Filter Popup */}
        {showFilterPopup && (
          <div className="filter-popup">
            <h3>Filter Options</h3>
            <div className="filter-fields">
              <div className="field">
                <label>Organization</label>
                <select
                  value={filterValue.organization}
                  onChange={(e) =>
                    setFilterValue({
                      ...filterValue,
                      organization: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="lendSqr">lendSqr</option>
                  <option value="Irorun">Irorun</option>
                </select>
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
                    setFilterValue({
                      ...filterValue,
                      dateJoined: e.target.value,
                    })
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
                  onChange={(e) => {
                    setFilterValue({ ...filterValue, status: e.target.value });
                  }}
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
                onClick={() => {
                  setShowFilterPopup(!showFilterPopup);
                  setFilterValue({
                    organization: "",
                    username: "",
                    email: "",
                    dateJoined: "",
                    phoneNumber: "",
                    status: "",
                  });
                }}
              >
                Reset
              </button>
              <button
                onClick={() => {
                  toggleFilterPopup();
                  setShowFilterPopup(!showFilterPopup);
                }}
              >
                filter
              </button>
            </div>
          </div>
        )}
      </div>
      <Pagination
        totalResults={data ? data?.length : 0}
        onPageChange={setPage}
        currentPage={page}
        handleRowsPerPageChange={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[20, 40, 60, 80, 100]}
      ></Pagination>
    </div>
  );
};

export default DashTable;
