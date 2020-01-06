import React, {useEffect} from 'react';
import Chart from "chart.js";

interface props {
    data: any
}

const PieChartComponent = ({data}: props) => {

    const [before, total] = data;


    useEffect(() => {
        let ctx: any = document.getElementById("myChart");
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [`Before 2005 ${Math.floor((before * 100) / total)}%`, "Total 100%"],
                datasets: [{
                    data: [before, total],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Comparation resources'
                },
                responsive: true
            }
        });
    }, []);

    return <canvas id="myChart"/>
};

export default PieChartComponent;