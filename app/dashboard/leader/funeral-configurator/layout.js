import styles from "./layout.module.css";
import { MultiStepMenu } from "./components/MultiStepMenu/MultiStepMenu";
import { FuneralCardPreview } from "./components/FuneralCardPreview/FuneralCardPreview";
import { FormProvider } from "./context/FormContext";

export default function FuneralConfigurator({ children }) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <MultiStepMenu />
                    <div className={styles.stepContainer}>
                        <FormProvider>{children}</FormProvider>
                    </div>
                </div>

                <FuneralCardPreview />
            </div>
        </>
    );
}
