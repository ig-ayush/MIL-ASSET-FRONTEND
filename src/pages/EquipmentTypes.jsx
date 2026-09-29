import CrudPage from "../components/common/CrudPage";
import { Input, Textarea } from "../components/common/Field";
import { getEquipmentTypes, createEquipmentType } from "../api/equipmentApi";
export default function EquipmentTypes() {
  return (
    <CrudPage
      title="Equipment Types"
      description="Define the asset categories used throughout the system."
      fetcher={() => getEquipmentTypes()}
      creator={createEquipmentType}
      searchKeys={["name", "unit", "description"]}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "unit", label: "Unit" },
        { key: "description", label: "Description" },
      ]}
      form={
        <>
          <Input label="Name" name="name" required />
          <Input label="Unit" name="unit" required />
          <Textarea label="Description" name="description" />
        </>
      }
    />
  );
}
