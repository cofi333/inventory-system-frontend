"use client";
import { DashboardHeader, CrudTable } from "@/components";
import styles from "@/styles/DashboardLayout.module.scss";
import { ROOM_TABLE_COLUMNS } from "@/utils/constants";
import dataApi from "@/resources/MOCK_DATA.json";
import "primereact/resources/themes/mira/theme.css";

const page = () => {
    return (
        <>
            <DashboardHeader title="Rooms" />
            <div className={styles.table_container}>
                <CrudTable
                    type="rooms"
                    columns={ROOM_TABLE_COLUMNS}
                    dataAPI={dataApi}
                />
            </div>
        </>
    );
};

export default page;
