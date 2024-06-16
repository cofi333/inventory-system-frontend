"use client";
import { CrudTable, DashboardHeader } from "@/components";
import styles from "@/styles/DashboardLayout.module.scss";
import { COMPANY_TABLE_COLUMNS } from "@/utils/constants";

import { API_ENDPOINT } from "@/utils/constants";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms";
import "primereact/resources/themes/mira/theme.css";
import useFetch from "@/utils/hooks/useFetch";

const page = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const { data, loading } = useFetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_COMPANIES}`
    );

    return (
        <>
            <DashboardHeader title="Companies" />
            <div className={styles.table_container}>
                {!loading && (
                    <CrudTable
                        type="companies"
                        columns={COMPANY_TABLE_COLUMNS}
                        dataAPI={data}
                    />
                )}
            </div>
        </>
    );
};

export default page;
