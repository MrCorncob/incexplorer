import Chart from "./chart.client";
import { ClientOnly } from "~/components/clientonly/clientonly";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
function ShieldVolumeChart() {
    return (
        <>
            <SectionTitle text="Shield Volume" />
            <ClientOnly>
                <Chart />
            </ClientOnly>

        </>

    );
}

export default ShieldVolumeChart;