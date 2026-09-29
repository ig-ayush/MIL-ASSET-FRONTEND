import CrudPage from "../components/common/CrudPage";
import { Input, Textarea } from "../components/common/Field";
import { getAssignments, createAssignment } from "../api/assignmentApi";
import { date, dateTime } from "../utils/formatters";
export default function Assignments() {
  return (
    <CrudPage
      title="Assignments"
      description="Track operational allocation of assets to personnel or units."
      fetcher={() => getAssignments()}
      creator={createAssignment}
      searchKeys={["assignedTo", "baseName", "equipmentTypeName"]}
      columns={[
        { key: "id", label: "ID" },
        { key: "baseName", label: "Base" },
        { key: "equipmentTypeName", label: "Equipment" },
        { key: "quantity", label: "Quantity" },
        { key: "assignedTo", label: "Assigned To" },
        {
          key: "assignmentDate",
          label: "Date",
          render: (r) => date(r.assignmentDate),
        },
        { key: "createdByName", label: "Created By" },
        {
          key: "createdAt",
          label: "Created",
          render: (r) => dateTime(r.createdAt),
        },
      ]}
      form={
        <>
          <Input label="Base ID" name="baseId" type="number" required />
          <Input
            label="Equipment Type ID"
            name="equipmentTypeId"
            type="number"
            required
          />
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            required
          />
          <Input label="Assigned To" name="assignedTo" required />
          <Input
            label="Assignment Date"
            name="assignmentDate"
            type="date"
            required
          />
          <Textarea label="Notes" name="notes" />
        </>
      }
    />
  );
}
