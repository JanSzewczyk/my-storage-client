import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

import Loading from "../../../UI/Loading/Loading";
import { formatMoney } from "../../../../shared/utils/currencyUtils";
import { setTimeUnitDate } from "../../../../shared/utils/chartUtils";
import StorageStatistic from "../../../../shared/types/statistic/StorageStatistic";

import "./StorageStatisticChart.scss";
import {
  dateToApiDateString,
  dateToDateString,
} from "../../../../shared/utils/dateUtils";

interface StorageStatisticChartProps {
  loading: boolean;
  statistics: StorageStatistic[];
}

const StorageStatisticChart: React.FC<StorageStatisticChartProps> = (props) => {
  const { loading, statistics } = props;

  let content = <Loading />;
  if (!loading) {
    const currency = _.uniq(_.map(statistics, (s) => s.currency))[0];

    let data = {
      labels: statistics.map((stat) => dateToApiDateString(stat.date)),
      datasets: [
        {
          label: "Store",
          type: "bar",
          fill: false,
          backgroundColor: "#288964",
          borderColor: "#288964",
          hoverBackgroundColor: "#288964",
          hoverBorderColor: "#288964",
          data: statistics.map((stat) => stat.storedValue),
        },
        {
          label: "Remove",
          type: "bar",
          fill: false,
          backgroundColor: "#dc2d37",
          borderColor: "#dc2d37",
          hoverBackgroundColor: "#dc2d37",
          hoverBorderColor: "#dc2d37",
          data: statistics.map((stat) => stat.removeValue),
        },
        {
          label: "Total Value",
          yAxisID: "y-axes-right",
          type: "line",
          fill: false,
          lineTension: 0.1,
          borderColor: "#0082f0",
          borderDashOffset: 0.0,
          pointBorderColor: "#0082f0",
          pointBackgroundColor: "#0082f0",
          pointBorderWidth: 0.5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#3ea6ff",
          pointHoverBorderColor: "#0082f0",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistics.map((stat) => stat.totalValue),
        },
      ],
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            offset: true,
            type: "time",
            time: {
              unit: setTimeUnitDate(statistics),
            },
          },
        ],
        yAxes: [
          {
            id: "y-axes-left",
            type: "linear",
            position: "left",
            ticks: {
              min: 0,
              callback: (label: any) => formatMoney(label, currency),
            },
          },
          {
            id: "y-axes-right",
            type: "linear",
            position: "right",
            ticks: {
              min: 0,
              callback: (label: any) => formatMoney(label, currency),
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem: any[]) => {
            console.log(tooltipItem);
            return dateToDateString(new Date(tooltipItem[0].label));
          },
          label: (tooltipItem: any, object: any) =>
            `${object.datasets[tooltipItem.datasetIndex].label}: ${formatMoney(
              tooltipItem.value,
              currency
            )}`,
        },
      },
    };

    content = <Bar data={data} options={options} />;
  }

  return <div className={"storage-statistic-chart"}>{content}</div>;
};

StorageStatisticChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  statistics: PropTypes.array.isRequired,
};

export default StorageStatisticChart;
