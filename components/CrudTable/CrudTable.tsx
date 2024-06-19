import "./CrudTable.scss";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useTableValidator } from "@/utils/hooks";
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
    const { validateRow } = useTableValidator();

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const selectEditor = (options: ColumnEditorOptions, field: string) => {
        let optionsValue;

        switch (field) {
            case "user_company":
                optionsValue = ["company1", "company2"];
                break;
            case "user_active":
            case "roomInventoryActive":
                optionsValue = ["Active", "Inactive"];
                break;
            case "user_role":
                optionsValue = ["Worker", "Employer"];
                break;
        }
        return (
            <Dropdown
                value={options.value}
                options={optionsValue}
                onChange={(e: DropdownChangeEvent) =>
                    options.editorCallback!(e.value)
                }
                placeholder="Select"
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

    const rowEditValidator = (rowData) => {
        return validateRow(type, rowData);
    };

    const onSubmit = (e) => {};

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
                />
                {columns.map((column) => (
                    <Column
                        field={column.field}
                        header={column.header}
                        editor={(options) =>
                            column.select
                                ? selectEditor(options, column.field)
                                : textEditor(options)
                        }
                        sortable={column.sortable}
                        key={column.id}
                    />
                ))}

                {type === "items" && <Column body={generateQRTemplate} />}
                <Column rowEditor />
            </DataTable>
        </div>
    );
};

export default CrudTable;
