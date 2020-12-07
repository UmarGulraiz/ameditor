import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import '@amcharts/amcharts4/charts';
import * as am4editor from '@amcharts/editor4';

const MainScreen = () => {


  const setColumnSeries = () => {
    let keys = Object.keys(dataValue[0]).splice(1)
    return keys.map((key) =>
      ({
        "type": "ColumnSeries",
        "id": key,
        "name": key,
        "dataFields": {
          "valueY": key,
          "categoryX": "country"
        }
      }))
  }

  let dataValue = [
    {
      "country": "2017",
      "TMB": -386.708,
      "FGC": -72.520691,
      "AMB": -84.841750,
      "RENFE":-67.7,
      "TRAM":-16.519716,
      "DGTM":-58.5258,
      "URBANES":-37.011,
    },
    {
      "country": "2018",
      "TMB": -406.029,
      "FGC": -75.812,
      "AMB": -87.7206,
      "RENFE":-67.28,
      "TRAM":-16.79273,
      "DGTM":-64.1016,
      "URBANES":-40.1533626,
    },
  ]

  let data = {
    "type": "XYChart",
    "data": dataValue,
    "xAxes": [{
      "type": "CategoryAxis",
      "dataFields": {
        "category": "country"
      },
        "renderer": {
          "grid": {
              "template": {
                  "type": "Grid",
                  "location": 0
              }
          },
      }
    }],
    "yAxes": [{
      "type": "ValueAxis",
      "max": 0
      }],
    "series": setColumnSeries(),
    "legend": {
      "type": "Legend"
    },
    "scrollbarX": {
      "type": "Scrollbar"
    }
  };

  const renderChart = () => {
    let chart = am4core.createFromConfig(
      JSON.parse(JSON.stringify(data)),
      'chartdiv'
    )
  }

  const editChart = () => {
    const launcher = new am4editor.EditorLauncher();

    launcher.addEventListener('close', () => {
      if (launcher) {
        launcher.close();
      }
    });
    launcher.addEventListener('save', (ev) => {
      if (ev) {
        data = ev.chartConfig;
        renderChart();
        if (launcher) {
          launcher.close();
        }
      }
    });
    launcher.launch(data);
  }

  useEffect(() => {
    renderChart()
  }, [])



  return (
    <div>
    <div id="chartdiv" style={{ width: '1000px', height: '660px', margin: '20px auto'}}/>
    <button onClick={editChart}>edit chart</button>
    </div>
  )
}

export default MainScreen
