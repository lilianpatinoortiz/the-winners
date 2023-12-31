import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { UPDATE_TASK } from "../../utils/mutations";
import Button from "@mui/material/Button";
import { Form, Modal } from "react-bootstrap";
import { QUERY_PROJECTS, QUERY_TASK } from "../..//utils/queries";
import { useTaskGuruContext } from "../../utils/GlobalState";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "priority",
    numeric: true,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "Due date",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "project",
    numeric: false,
    disablePadding: false,
    label: "Project",
  },
  {
    id: "createdDate",
    numeric: false,
    disablePadding: false,
    label: "Created On",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{
              "aria-label": "select all tasks",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.label != "Title" ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function TasksList({ tasks, rowsPerPageProp, isBackgroundColorEnabled }) {
  const [rows, setRows] = useState(tasks);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp);
  const [show, setShow] = useState({ task: false });
  const handleShowEditTask = () => setShow({ task: true });
  const handleClose = () => setShow({ task: false });

  const editTask = () => {
    handleShowEditTask();
  };

  useEffect(() => {
    setRows(tasks);
  }, [rows, tasks]);

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  function EditTaskForm() {
    const navigate = useNavigate();

    // Logged user data (me)
    const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
    const user = userData?.me || {};

    // Projects data
    const { loading: projectloading, data: projectsData } =
      useQuery(QUERY_PROJECTS);
    const [projects, setProjects] = useState(projectsData);
    const [myProjects, setMyProjects] = useState([]);

    // Tasks data
    const { loading: taskloading, data: taskData } = useQuery(QUERY_TASK, {
      variables: { id: selected[0] },
    });
    const [task, setTask] = useState(taskData);

    const [taskFormData, setTaskFormData] = useState({});

    // Handle task changes
    useEffect(() => {
      if (taskData) {
        setTask(taskData.task);
        setTaskFormData({ ...task });
      }
    }, [task, taskData]);

    // Handle projects changes
    useEffect(() => {
      if (projectsData) {
        setProjects(projectsData.projects);
        setMyProjects(
          projectsData.projects.filter((project) => project.userid === user._id)
        );
      }
    }, [projects, projectsData]);

    const [updateTask, { error }] = useMutation(UPDATE_TASK);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
        const { data } = await updateTask({
          variables: { ...taskFormData, taskid: selected[0] },
        });
        //console.log("Task updated", data.updateTask);
        Swal.fire({
          text: "Task updated",
          icon: "success",
          background: "white",
        }).then((result) => {
          handleClose();
          setTaskFormData({});
          navigate("/");
        });
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        {!taskloading ? (
          <div>
            <Form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              {" "}
              <Form.Group className="mb-3" controlId="project">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  placeholder="status"
                  type="dropdown"
                  name="status"
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, status: e.target.value })
                  }
                  value={taskFormData.status}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Finished">Finished</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="title"
                  type="text"
                  name="title"
                  value={taskFormData.title}
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="description"
                  type="text"
                  name="description"
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      description: e.target.value,
                    })
                  }
                  value={taskFormData.description}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  placeholder="due date"
                  type="date"
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      dueDate: e.target.value,
                    })
                  }
                  value={taskFormData.dueDate}
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label>Prority</Form.Label>
                <Form.Range
                  placeholder="prority"
                  type="number"
                  min="1"
                  max="3"
                  name="prority"
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      priority: parseInt(e.target.value),
                    })
                  }
                  value={taskFormData.priority}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  key="23"
                  placeholder="project"
                  type="dropdown"
                  name="project"
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      project: e.target.value,
                    })
                  }
                  value={taskFormData.project}
                >
                  {myProjects.map((project) => (
                    <option key={project.title} value={project.title}>
                      {project.title}
                    </option>
                  ))}
                  =
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </Form>
          </div>
        ) : null}
      </>
    );
  }
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [id];

    // code commented to prevent multiple select!

    //let newSelected = selected.indexOf(id);
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <div id="modals">
        <Modal show={show.task} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditTaskForm />
          </Modal.Body>
        </Modal>
      </div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {selected.length} selected
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Tasks
              </Typography>
            )}

            {selected.length > 0 ? (
              <Tooltip title="Edit">
                <IconButton onClick={() => editTask()}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${row._id}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          key={index}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ width: "200px" }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        className={
                          isBackgroundColorEnabled
                            ? "priority-" + row.priority
                            : ""
                        }
                        align="right"
                        style={{ width: "10px" }}
                      >
                        {row.priority}
                      </TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        {new Date(parseInt(row.dueDate)).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.project}</TableCell>
                      <TableCell align="right">
                        {new Date(
                          parseInt(row.createdDate)
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  );
}

export { TasksList };
