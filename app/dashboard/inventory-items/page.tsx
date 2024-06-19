"use client";
import styles from "@/styles/DashboardLayout.module.scss";
import { DashboardHeader, CrudTable } from "@/components";
import { ITEM_TABLE_COLUMNS } from "@/utils/constants";
import MOCK_DATA_ITEMS from "@/resources/MOCK_DATA_ITEMS.json";
import "primereact/resources/themes/mira/theme.css";

const page = () => {
    return (
        <>
            <DashboardHeader title="Items" />
            <div className={styles.table_container}>
                <CrudTable
                    columns={ITEM_TABLE_COLUMNS}
                    type="items"
                    dataAPI={MOCK_DATA_ITEMS}
                />
            </div>
        </>
    );
};

export default page;
