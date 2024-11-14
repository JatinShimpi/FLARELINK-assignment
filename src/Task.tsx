import { Checkbox, Collapse, Tooltip } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const { Panel } = Collapse;
import "./index.css";

const Task = ({ data, onDelete, onStatusChange, onEdit }) => {
  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked ? "Completed" : "Pending";
    onStatusChange(data.id, newStatus);
  };
  return (
    <div className="w-full bg- rounded-md bg-slate-300">
      <Collapse className="custom-collapse">
        <Panel
          header={
            <div className="flex flex-row justify-between text-neutral-900 text-lg">
              <h1
                className="ml-2 font-bold"
                style={{
                  textDecoration:
                    data.status === "Completed" ? "line-through" : "none",
                  color: data.status === "Completed" ? "" : "inherit",
                }}
              >
                {data.title}
              </h1>
              <div className="flex flex-row">
                <span className="my-auto flex flex-row">
                  <h1 className="text-neutral-900 text-lg mr-2">
                    {data.status === "Completed" ? "Completed" : "Pending"}
                  </h1>
                  <Checkbox
                    checked={data.status === "Completed"}
                    onChange={handleCheckboxChange}
                    className="text-neutral-900 text-lg mr-2"
                  ></Checkbox>
                </span>
                <span className="my-auto mr-2 text-neutral-900">
                  {" "}
                  priority : {data.priority}
                </span>
                <Tooltip title="Delete">
                  <span
                    onClick={() => onDelete(data.id)}
                    className="my-auto mr-2 pb hover:text-slate-500 text-xl transition-all duration-300"
                  >
                    <MdDeleteForever />
                  </span>
                </Tooltip>
                <span className="my-auto mr-2 text-xl">
                  <Tooltip title="Edit task">
                    <FaRegEdit
                      className="hover:text-slate-500 hover:cursor-pointer transition-all duration-300 tooltip-"
                      onClick={onEdit}
                    />
                  </Tooltip>
                </span>
              </div>
            </div>
          }
          key="1"
        >
          <div className="bg-slate-100 w-full mx-2 rounded-md h-full">
            <p className="mx-2 my-1">{data.description}</p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Task;
