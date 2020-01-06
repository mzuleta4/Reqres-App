import React, {useEffect, useState} from 'react';
import PieChartComponent from "../Shared/PieChartComponent";
import history from "../../Util/History";

interface props {
    resourceList: Array<any>
}

const StatiticsComponent = ({resourceList}: props) => {
    const [count, setCount] = useState<Array<any>>([]);

    useEffect(() => {
        resourceList.forEach(resource => {
            if (resource.year < 2005) {
                setCount(count => [...count, resource.year]);
            }
        });
        if (performance.navigation.type === 1) {
            history.push("/list");
        }
    }, []);


    return <div>
        {count.length > 0 && <PieChartComponent data={[count.length, resourceList.length]}/>}

    </div>

};

export default StatiticsComponent;