"use client";
import { DashboardHeader, CrudTable } from "@/components";
import styles from "@/styles/DashboardLayout.module.scss";
import { USER_TABLE_COLUMNS } from "@/utils/constants";
import data from "@/resources/MOCK_DATA_USERS.json";

const page = () => {
    return (
        <>
            <DashboardHeader title="Users" />
            <div className={styles.table_container}>
                <CrudTable
                    type="user"
                    columns={USER_TABLE_COLUMNS}
                    dataAPI={data}
                />
            </div>
        </>
    );
};

export default page;
