/*Router */
import Router from "./Router";

/*Templates*/
import Header from "./Header";
import Sidebar from "./Sidebar";
import SubHeader from "./SubHeader";

/* Modal*/
import Modals from "./Modals";
import ProjectModal from "./ProjectModal";
import NoteModal from "./NoteModal";
/* project */

import EmptyProject from "./EmptyProject";
import ProjectList from "./ProjectList";
import ProjectHeader from "./ProjectHeader";
import ProjectCardList from "./ProjectCardList";

import Contents from "./Contents";

/* == Note - kanban */
import InnerHeader from "./notes/InnerHeader";
import KanbanCard from "./notes/KanbanCard";
import KanbanList from "./notes/KanbanList";
import KanbanBoard from "./notes/KanbanBoard";

/* == Note - detail */
import NoteDetail from "./notes/NoteDetail";

export {
  Header,
  ProjectModal,
  Router,
  Sidebar,
  NoteModal,
  Modals,
  Contents,
  SubHeader,
  ProjectList,
  ProjectHeader,
  ProjectCardList,
  EmptyProject,
  /* == Note - kanban */
  InnerHeader,
  KanbanList,
  KanbanCard,
  KanbanBoard,
  /* == Note - kanban */
  NoteDetail,
};
