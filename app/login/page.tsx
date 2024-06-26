"use client";
import Image from "next/image";
import styles from "@/styles/Login.module.scss";
import { LoginImage } from "@/resources/images";
import { Navigation, Footer, LoginForm } from "@/components";
import Head from "next/head";

const Login = () => {
    return (
        <>
            <Head>
                <title>Inventory management system</title>
            </Head>
            <Navigation />
            <section className={`${styles.login} container`}>
                <LoginForm />
                <div className={styles.login_image}>
                    <Image
                        alt="Login image"
                        src={LoginImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={styles.image}
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;
