import CrudPage from "../components/common/CrudPage";
import { Input, Textarea } from "../components/common/Field";
import { getPurchases, createPurchase } from "../api/purchaseApi";
import { money, date, dateTime } from "../utils/formatters";
export default function Purchases() {
  return (
    <CrudPage
      title="Purchases"
      description="Record incoming asset purchases and supplier details."
      fetcher={() => getPurchases()}
      creator={createPurchase}
      searchKeys={["supplier", "equipmentTypeName", "baseName"]}
      columns={[
        { key: "id", label: "ID" },
        { key: "baseName", label: "Base" },
        { key: "equipmentTypeName", label: "Equipment" },
        { key: "quantity", label: "Quantity" },
        {
          key: "unitPrice",
          label: "Unit Price",
          render: (r) => money(r.unitPrice),
        },
        {
          key: "totalPrice",
          label: "Total",
          render: (r) =>
            money(
              r.totalPrice ??
                Number(r.quantity || 0) * Number(r.unitPrice || 0),
            ),
        },
        { key: "supplier", label: "Supplier" },
        {
          key: "purchaseDate",
          label: "Date",
          render: (r) => date(r.purchaseDate),
        },
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
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              required
            />
            <Input
              label="Unit Price"
              name="unitPrice"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Input label="Supplier" name="supplier" required />
          <Input
            label="Purchase Date"
            name="purchaseDate"
            type="date"
            required
          />
          <Textarea label="Notes" name="notes" />
        </>
      }
    />
  );
}
