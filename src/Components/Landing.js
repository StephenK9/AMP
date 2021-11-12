/* src/App.js */
import React, { useEffect, useState } from 'react'

import { Chart } from 'react-chartjs-2';
import awsExports from "../aws-exports";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-dragdata'
import './Landing.css'
import * as mutations from '../graphql/mutations'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
Chart.register(zoomPlugin); // REGISTER PLUGIN
Amplify.configure(awsExports);

export default function Landing(props) {

  const [isChartReady, setIsChartReady] = useState(false)
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  var chartName = ""
  const [authState, setAuthState] = React.useState();
  sessionStorage.user = props.user;

  useEffect(() => {
    fetchTodos(props.user)

    return () => {

    }
  }, [])
  window.fetchTodos = fetchTodos
  async function fetchTodos(name) {
    // const todoDetails = {
    //   id: '8ade8090-5cf0-42ae-96d4-cac83f6b5519',
    //   data: [1,2,3,4,5],
    //   otherData:{name:'Micahel',surname:"Kloos"}
    // };
    // const todoDetails2 = {
    //   workMonthEmployeeId: 'b22e4bda-dce9-492a-8a36-c6a75198fda6',
    //   month:1,
    //   projects:[{projectID:'3b669fce-5d56-4e70-af58-223a32820d1e',time:'33'},{projectID:'30b9728c-c2a6-43d6-9a81-59e51694deef',time:'33'},{projectID:'632addd7-949e-4425-b7aa-fd5dd7352498',time:'34'}]

    // };
    const mondays = [1630879200000,1631484000000,1632088800000,1632693600000,1633298400000,1633903200000,1634508000000,1635112800000,1635717600000,1636322400000,1636927200000,1637532000000,1638136800000,1638741600000,1639346400000,1639951200000,1640556000000,1641160800000,1641765600000,1642370400000,1642975200000,1643580000000,1644184800000,1644789600000,1645394400000,1645999200000,1646604000000,1647208800000,1647813600000,1648418400000,1649023200000,1649628000000,1650232800000,1650837600000,1651442400000,1652047200000,1652652000000,1653256800000,1653861600000,1654466400000,1655071200000,1655676000000,1656280800000,1656885600000,1657490400000,1658095200000,1658700000000,1659304800000,1659909600000,1660514400000,1661119200000,1661724000000,1662328800000,1662933600000,1663538400000,1664143200000,1664748000000,1665352800000,1665957600000,1666562400000,1667167200000,1667772000000,1668376800000,1668981600000,1669586400000,1670191200000,1670796000000,1671400800000,1672005600000,1672610400000,1673215200000,1673820000000,1674424800000,1675029600000,1675634400000,1676239200000,1676844000000,1677448800000,1678053600000,1678658400000,1679263200000,1679868000000,1680472800000,1681077600000,1681682400000,1682287200000,1682892000000,1683496800000,1684101600000,1684706400000,1685311200000,1685916000000,1686520800000,1687125600000,1687730400000,1688335200000,1688940000000,1689544800000,1690149600000,1690754400000,1691359200000,1691964000000,1692568800000,1693173600000,1693778400000,1694383200000,1694988000000,1695592800000,1696197600000,1696802400000,1697407200000,1698012000000,1698616800000,1699221600000,1699826400000,1700431200000,1701036000000,1701640800000,1702245600000,1702850400000,1703455200000,1704060000000,1704664800000,1705269600000,1705874400000,1706479200000,1707084000000,1707688800000,1708293600000,1708898400000,1709503200000,1710108000000,1710712800000,1711317600000,1711922400000,1712527200000,1713132000000,1713736800000,1714341600000,1714946400000,1715551200000,1716156000000,1716760800000,1717365600000,1717970400000,1718575200000,1719180000000,1719784800000,1720389600000,1720994400000,1721599200000,1722204000000];
    mondays.forEach(async (val)=>{
      const todoDetails2 = {
        workWeekEmployeeId: 'ee3f80cf-c268-4598-9f26-e2b95c57bb35',
        week:val/1000,
        effort:Math.floor(60),
        projects:[{projectID:'2cba0eae-9d74-4618-90bf-664ccbf574c2',time:'20'},{projectID:'a0f704df-29ef-40ca-a7c7-9fbb7f6675d9',time:'20'},{projectID:'7dd56afb-bd30-49fd-9997-b472f24f7e92',time:'20'}]
        
      };
      await API.graphql({ query: mutations.createWorkWeek, variables: {input: todoDetails2}});
    })
    
    // for(var i =1;i<=12;i++){
    //   const todoDetails2 = {
    //     workWeekEmployeeId: 'cf1539d3-b467-4a56-87bb-1c6598c9c422',
    //     week:i,
    //     effort:Math.floor(Math.random()*100),
    //     projects:[{projectID:'3b669fce-5d56-4e70-af58-223a32820d1e',time:'33'},{projectID:'30b9728c-c2a6-43d6-9a81-59e51694deef',time:'33'},{projectID:'632addd7-949e-4425-b7aa-fd5dd7352498',time:'34'}]
        
    //   };
    //   await API.graphql({ query: mutations.updateWorkMonth, variables: {input: todoDetails2}});
    // }
 
    // const updatedTodo = await API.graphql({ query: mutations.updateTestTable, variables: {input: todoDetails}});
    // const updatedTodo2 = await API.graphql({ query: mutations.updateWorkMonth, variables: {input: todoDetails2}});

    // const SubscribeToEventComments = `subscription MySubscription {
    //   onUpdateTestTable {
    //     id
    //     data
    //     createdAt
    //   }
    // }`;
    
    // const subscription = API.graphql(
    //     graphqlOperation(SubscribeToEventComments)
    // ).subscribe({
    //     next: eventData => console.log(eventData),
    // });
    // try {

    //   // const todoData = await API.graphql(graphqlOperation(todosByName,{name:name,filter: {createdAt: {gt: "2021-09-21T00:30:45.931Z0"}}}));
    //   const todoData = await API.graphql({
    //     query: todosByName,
    //     variables: { name: name },
    //     filter: { createdAt: { gt: "2021-09-21T00:30:45.931Z0" } },
    //     authMode: "AMAZON_COGNITO_USER_POOLS"
    //   })
    //   console.log(todoData);
    //   const todos = todoData.data.todosByName.items
    //   console.log(todoData);

    //   var orderedTodos = todos.sort(function (a, b) { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() });
    //   console.log(orderedTodos);

    //   var dataSet1 = orderedTodos.map((element, index) => {

    //     return element.description
    //   });
    //   var dataSet2 = dataSet1.map((element, index) => {
    //     return 30 - element
    //   });
    //   var timestamps = todos.map((element, index) => {
    //     return new Date(element.createdAt).getTime()
    //   })
    //   timestamps = timestamps.sort(function (a, b) { return a - b });
    //   console.log(dataSet1);
    //   console.log(dataSet2);
    //   console.log(timestamps);
    //   setChartData({
    //     labels: timestamps,
    //     datasets: [
    //       {
    //         label: 'EXO',
    //         data: dataSet1,
    //         fill: false,
    //         backgroundColor: 'rgba(44, 130, 201, 1)',
    //         borderColor: 'rgba(44, 130, 201, 1)',
    //         cubicInterpolationMode: 'monotone',
    //       },
    //       {
    //         label: 'SENCELL',
    //         data: dataSet2,
    //         fill: false,
    //         backgroundColor: 'rgba(248, 148, 6, 1)',
    //         borderColor: 'rgba(248, 148, 6, 1)',
    //         cubicInterpolationMode: 'monotone',
    //       },

    //     ],

    //   })
    //   setChartOptions({
   
    //     datasets: {
    //       point: {
    //         pointHitRadius: 25
    //       }
    //     },
    //     plugins: {
    //       dragData: {
    //         round: 1,
    //         showTooltip: true,
    //         onDragStart: function (e) {
    //           // console.log(e)
    //         },
    //         onDrag: function (e, datasetIndex, index, value) {
    //           e.target.style.cursor = 'grabbing'
    //           // console.log(e, datasetIndex, index, value)
    //         },
    //         onDragEnd: function (e, datasetIndex, index, value) {
    //           e.target.style.cursor = 'default'
    //           // console.log(datasetIndex, index, value)
    //         },
    //       },
    //       zoom: {

    //         zoom: {

    //           wheel: {
    //             enabled: true,
    //           },
    //           mode: 'x',
    //         },
    //         pan: {
    //           enabled: true,
    //           mode: 'x',
    //         },
    //       },
    //       title: {
    //         display: true,
    //         text: `This is how ${orderedTodos[0].name} has been spending his/her time`
    //       }
    //     },
    //     scales: {
    //       x: {
    //         min: 1632546290443,
    //         type: 'time',

    //       },
    //       y: {
    //         type: 'linear'
    //       }
    //     }
    //   })
    //   setIsChartReady(true)

    // } catch (err) { console.log('error fetching todos') }
  }







  return (
    <div>

      {/* <div>Weclcome back, {props.user}</div> */}
      {/* {props.user?<div>Weclcome back, {props.user}</div>:null}
      <hr/> */}
      {/* <ProjectSlider fetchTodos={fetchTodos} /> */}

      <div className="myClassNameOk">


        {/* {isChartReady ? <Line data={chartData} options={chartOptions} /> : null} */}

      </div>
      <div style={{ width: "30vw", margin: "auto" }}>
      {/* <BubbleModal ></BubbleModal> */}
        {/* <AmplifySignOut /> */}
      </div>
      {/* <Todo></Todo> */}


    </div>

  )
}

