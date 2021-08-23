/* Router */
import Router from "./Router";

/* Templates */
import Header from "./Header";
import Sidebar from "./Sidebar";
import Template from "./Template";
import Contents from "./Contents";
import Spinner from "./Spinner.jsx";
import Paging from "./Paging";

/* Modal */
import Modals from "./modals/Modals";
import ProjectModal from "./modals/ProjectModal";
import ProjectModalEdit from "./modals/ProjectModalEdit";
import ProjectInvite from "./modals/ProjectInvite";
import ProjectJoin from "./modals/ProjectJoin";

/* project */
import EmptyProject from "./projects/EmptyProject";
import ProjectList from "./projects/ProjectList";
import ProjectHeader from "./projects/ProjectHeader";
import ProjectCardList from "./projects/ProjectCardList";
import LeaveProject from "./projects/LeaveProject";
import MemberDropBox from "./modals/MemberDropBox";

/* == Note - kanban */
import ProjectMenu from "./notesShared/ProjectMenu";
import KanbanCard from "./notesKanban/KanbanCard";
import KanbanList from "./notesKanban/KanbanList";
import KanbanBoard from "./notesKanban/KanbanBoard";

/* == Note - modal */
import ModalWrapper from "./notesModal/ModalWrapper";
import ModalWriting from "./notesModal/ModalWriting";

/* == Note - file control */
import FileUploader from "./files/FileUploader";
import FilePreviewer from "./files/FilePreviewer";

/* == Note - issue list; card */
import IssueCard from "./notesIssue/IssueCard";
import IssueList from "./notesIssue/IssueList";
import EmptyBoard from "./notesIssue/EmptyBoard";

/* == Note - detail */
import NoteDetail from "./notesShared/NoteDetail";

/* == Note - detail - Comment */
import CommentCard from "./comments/CommentCard";
import CommentList from "./comments/CommentList";
import CommentInput from "./comments/CommentInput";

/* Search */
import SearchList from "./search/SearchList";
import EmptySearch from "./search/EmptySearch";

export {
  Router,
  Header,
  Sidebar,
  Template,
  Contents,
  Spinner,
  Paging,
  /* == Modal */
  Modals,
  ProjectModal,
  ProjectModalEdit,
  ProjectInvite,
  ProjectJoin,
  /* == Project */
  ProjectList,
  ProjectHeader,
  ProjectCardList,
  EmptyProject,
  LeaveProject,
  MemberDropBox,
  /* == Note - kanban */
  ProjectMenu,
  KanbanList,
  KanbanCard,
  KanbanBoard,
  /* == Note - modals */
  ModalWrapper,
  ModalWriting,
  /* == Note - file control */
  FileUploader,
  FilePreviewer,
  /* == Note - list */
  IssueCard,
  IssueList,
  EmptyBoard,
  /* == Note - detail */
  NoteDetail,
  /* == Note - detail - Comment */
  CommentCard,
  CommentList,
  CommentInput,
  /* == Serach */
  SearchList,
  EmptySearch,
};
