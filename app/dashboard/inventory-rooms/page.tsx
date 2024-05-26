"use client";
import { DashboardHeader, RoomTable } from "@/components";
import styles from "@/styles/DashboardLayout.module.scss";
import "primereact/resources/themes/mira/theme.css";

const page = () => {
    return (
        <>
            <DashboardHeader title="Rooms" />
            <div className={styles.rooms}>
                <RoomTable />
            </div>
        </>
    );
};

export default page;
