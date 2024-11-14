import { Button, DatePicker, Form, Input, List, Modal, Select } from "antd";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Task from "./Task";
import moment from "moment";
import { motion } from "framer-motion";

import "./index.css";

interface tasksTypes {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

// const tasksArray: tasksTypes[] = [
//   {
//     id: 1,
//     title: "Complete project documentation",
//     description:
//       "Write detailed documentation for the new project, covering all modules and APIs.",
//     status: "In Progress",
//     priority: "10",
//     dueDate: "2024-11-20",
//   },
//   {
//     id: 2,
//     title: "Fix login bug",
//     description:
//       "Resolve the issue causing login failure for users with special characters in their passwords.",
//     status: "Pending",
//     priority: "8",
//     dueDate: "2024-11-15",
//   },
//   {
//     id: 3,
//     title: "Design landing page",
//     description:
//       "Create a new landing page design with a modern and responsive layout.",
//     status: "Completed",
//     priority: "9",
//     dueDate: "2024-11-10",
//   },
//   {
//     id: 4,
//     title: "Team meeting",
//     description:
//       "Hold a weekly team meeting to discuss project updates and upcoming deadlines.",
//     status: "Scheduled",
//     priority: "4",
//     dueDate: "2024-11-18",
//   },
//   {
//     id: 5,
//     title: "Database optimization",
//     description:
//       "Analyze and optimize database queries to improve application performance.",
//     status: "In Progress",
//     priority: "3",
//     dueDate: "2024-11-22",
//   },
//   {
//     id: 6,
//     title: "Implement task manager UI",
//     description:
//       "Build the user interface for the task manager, including task list and detail views.",
//     status: "Pending",
//     priority: "5",
//     dueDate: "2024-11-19",
//   },
//   {
//     id: 7,
//     title: "Code review",
//     description:
//       "Review the code submitted by teammates for the new feature development.",
//     status: "Completed",
//     priority: "6",
//     dueDate: "2024-11-05",
//   },
//   {
//     id: 8,
//     title: "Update dependencies",
//     description:
//       "Check for updates to dependencies and upgrade to the latest stable versions.",
//     status: "Pending",
//     priority: "7",
//     dueDate: "2024-11-25",
//   },
//   {
//     id: 9,
//     title: "User testing",
//     description:
//       "Conduct user testing for the latest release to gather feedback and identify bugs.",
//     status: "Scheduled",
//     priority: "1",
//     dueDate: "2024-11-26",
//   },
//   {
//     id: 10,
//     title: "Prepare release notes",
//     description:
//       "Draft and finalize release notes for the upcoming product release.",
//     status: "In Progress",
//     priority: "2",
//     dueDate: "2024-11-21",
//   },
// ];

const App = () => {
  const [showPage, setShowPage] = useState<boolean>(false);
  const [tasks, setTasks] = useState<tasksTypes[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 2000); // 2000ms = 2 seconds
    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false);
  };

  const showEditModal = (task: tasksTypes) => {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditingTaskId(task.id);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: moment(task.dueDate, "YYYY-MM-DD"),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditingTaskId(null);
    form.resetFields();
  };

  const handleAddTask = (values: any) => {
    if (isEditMode && editingTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: values.title,
              description: values.description,
              priority: values.priority,
              dueDate: values.dueDate.format("YYYY-MM-DD"),
            }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask: tasksTypes = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        status: "Pending",
        priority: values.priority,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    }
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditingTaskId(null);
    form.resetFields();
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === "Completed" && b.status !== "Completed") return 1;
    if (a.status !== "Completed" && b.status === "Completed") return -1;
    return Number(a.priority) - Number(b.priority);
  });

  const buttonVariants = {
    hidden: { x: 100, opacity: 0 }, // Start position off-screen to the right
    visible: {
      x: 0, // Move to its original position
      opacity: 1, // Fade in
      transition: { duration: 0.8, delay: 2 }, // Set transition duration
    },
  };
  const taskVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 2.5 }, // Delay for sequential animation
    },
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-hidden"
      style={{ backgroundImage: "url('/pexels-therato-3374210.jpg')" }}
    >
      <motion.div
        className="absolute z-10"
        initial={{ opacity: 0 }}
        animate={{ z: -40, opacity: showPage?0: 1 }}
        transition={{ delay: 1, duration: 1, type: "tween" }}
      >
        <img
          src="/j3s-taskmanager-high-resolution-logo-transparent.png"
          alt="Logo"
          className="w-[500px] h-auto"
        />
      </motion.div>

      {showPage && (
        <>
          <Navbar />

          <div className="pt-20 px-5 w-full">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Button className="bg-slate-300 mb-4" onClick={showModal}>
                Add Task
              </Button>
            </motion.div>

            <div className="h-[calc(100vh-170px)] overflow-auto w-full">
              <List
                dataSource={sortedTasks}
                renderItem={(item, idx) => (
                  <motion.div
                    key={item.id}
                    variants={taskVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <List.Item className="w-full">
                      <Task
                        key={idx}
                        data={item}
                        onDelete={() => handleDeleteTask(item.id)}
                        onStatusChange={handleStatusChange}
                        onEdit={() => showEditModal(item)}
                      />
                    </List.Item>
                  </motion.div>
                )}
                className="w-full"
              />
            </div>
          </div>
          <Modal
            title={isEditMode ? "Update Task" : "Add New Task"}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} onFinish={handleAddTask} layout="vertical">
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input.TextArea placeholder="Enter task description" />
              </Form.Item>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: "Please select priority" }]}
              >
                <Select placeholder="Select priority level">
                  <Select.Option value="1">1 (Highest)</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                  <Select.Option value="5">5 (Lowest)</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Due Date"
                name="dueDate"
                rules={[
                  { required: true, message: "Please select a due date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  {isEditMode ? "Update Task" : "Add Task"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default App;
