import "./RoomTable.scss";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useToastMessage } from "@/utils/hooks";
import { QRCodeGenerateIcon } from "@/resources/icons";
import Image from "next/image";
import { TableHeader } from "./TableHeader";

const CrudTable = ({ columns, type, dataAPI }) => {
    const [data, setData] = useState(dataAPI);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [selectedData, setSelectedData] = useState(null);
    const [statuses] = useState<string[]>(["Active", "Inactive"]);
    const showToast = useToastMessage();

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const statusEditor = (options: ColumnEditorOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e: DropdownChangeEvent) =>
                    options.editorCallback!(e.value)
                }
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option}></Tag>;
                }}
            />
        );
    };

    const generateQRTemplate = () => {
        return (
            <div className="qr-code-template">
                <Image
                    src={QRCodeGenerateIcon}
                    width={24}
                    height={24}
                    alt="Qr code icon"
                />
            </div>
        );
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
                validateOnly
            />
        );
    };

    const onSubmit = (e) => {};

    const rowEditValidator = (rowData) => {
        const { roomNumber, roomDescription, roomName } = rowData;

        if (roomNumber === "" || isNaN(roomNumber)) {
            showToast(
                "error",
                "Room number must be a number and can't be empty."
            );
            return false;
        }

        if (roomName.trim() === "" || roomName.length < 5) {
            showToast("error", "Room name must have at least 5 characters.");
            return false;
        }

        if (roomDescription.trim() === "" || roomDescription.length < 20) {
            showToast(
                "error",
                "Room description must have at least 20 characters."
            );
            return false;
        }

        return true;
    };

    return (
        <div className="card">
            <DataTable
                value={data}
                showGridlines
                filters={filters}
                header={
                    <TableHeader
                        globalFilterValue={globalFilterValue}
                        onGlobalFilterChange={onGlobalFilterChange}
                        selectedData={selectedData}
                        type={type}
                    />
                }
                emptyMessage={`No ${type} found.`}
                paginator
                rows={10}
                editMode="row"
                onRowEditComplete={onSubmit}
                selection={selectedData!}
                onSelectionChange={(e) => setSelectedData(e.value)}
                selectionMode="multiple"
                rowEditValidator={rowEditValidator}
            >
                <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                ></Column>
                {columns.map((column) => (
                    <Column
                        field={column.field}
                        header={column.header}
                        editor={(options) => textEditor(options)}
                        sortable={column.sortable}
                        key={column.id}
                    />
                ))}

                {type === "rooms" && (
                    <Column
                        field="roomInventoryActive"
                        header="Inventory status"
                        editor={(options) => statusEditor(options)}
                        body={(rowData) =>
                            rowData.roomInventoryActive ? "Active" : "Inactive"
                        }
                    />
                )}

                {type === "items" && (
                    <Column body={generateQRTemplate}></Column>
                )}

                <Column rowEditor></Column>
            </DataTable>
        </div>
    );
};

export default CrudTable;
