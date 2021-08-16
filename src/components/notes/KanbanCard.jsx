import React  from "react";

/* == Library - icon */
import { Clock } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Custom - elements */
import Labels from "../../elements/Labels";

// * == ( kanban / Note ) -------------------- * //
const KanbanCard = ({ note, step, ...rest }) => {
  const deadline = note.deadline ? moment(note.deadline).format("YYYY년 M월 D일") : "" ;
  let dateDiff = note.deadline ? moment(note.deadline).diff(moment(), "days") : "" ;
  // const deadline = moment(note.deadline).toNow();
  return (
    <div className="kanban-card">
      <h1>{note.title}</h1>
      <Labels type={step} dateDiff={dateDiff}>
        <Clock/>
        {deadline}
      </Labels>
    </div>
  );
};

export default KanbanCard;