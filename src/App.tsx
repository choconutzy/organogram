import React, { useLayoutEffect } from 'react';
import './App.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";


function App() {
  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv");
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(70),
        height: am5.percent(70),
        layout: root.verticalLayout,
      })
    );

    let series = container.children.push(
      am5hierarchy.Tree.new(root, {
        downDepth: 1,
        initialDepth: 1,
        singleBranchOnly: false,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "id",
        orientation: 'horizontal',
      })
    );
    series.circles.template.setAll({
      radius: 60
    });
    
    series.outerCircles.template.setAll({
      radius: 20
    });
    // Generate and set data
    var testData = [
        { 
          id: 'PETSU1',
          name: 'Subsidiary',
          isHaveChild: true,
          children: [
            {
              id: 'PETSUHA',
              name: 'PT Ha',
              isHaveChild: false,
          },                                    
          {
            id: 'PETSU1HI',
            name: 'PT Hi', 
            isHaveChild: false,
          },
        ]
        },                            
        { 
          id: 'PETSC1',
          name: 'SCF', 
          isHaveChild: true,
          children: [
            {
              id: 'PETSC1HU',
              name: 'PT Hu', 
            },
          ]
        },                            
        { 
          id: 'PETCO1',
          name: 'Consumer', 
          isHaveChild: true,
          children: [
            {
              id: 'PETCO1HE',
              name: 'PT he', 
          },
          ]
        },
    ];
    var initData = [
      {
          id: 'PETSU1',
          name: 'Subsidiary',
          value: 2,
          isHaveChild: true,
      },            
      { 
          id:'PETSC1',
          name: 'SCF',
          value: 2,
          isHaveChild: true,
      },                            
      { 
          id:'PETCO1',
          name: 'Consumer',
          value: 2,
          isHaveChild: true,
      },
    ]
    var data = {
      name: "Pertamina",
      children: initData
    }
    function findNode(name: string) {
      return series.nodes.values.find(function(node: any) {
        return node.dataItem.get("id") === name;
      })
    }
    function findLevelById(node:any, id:any, currentLevel = 1) {
      // Check if the current node's name matches the target name
      if (node.id === id) {
        return currentLevel;
      }
    
      // If the node has children, recursively search in its children
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var childLevel:any = findLevelById(node.children[i], id, currentLevel + 1);
          // If the child level is found, return it
          if (childLevel) {
            return childLevel;
          }
        }
      }
      // Return null if the name is not found in the current subtree
      return null;
    }
    const findViaAPI = (id: string) => {
      return testData.find(e => e?.id === id)?.children || [];
    }
    series.nodes.template.events.on("click", (e:any) => {
      var dataItem = e.target.dataItem;
      // Dispose data if clicked when shift is pressed
      if (e.originalEvent.shiftKey) {
        series.disposeDataItem(dataItem);
      } else {
        // Set value of original data item to undefined, so that only child values would be used
        // dataItem.set("value", undefined);
        // dataItem.set("valueWorking", undefined);
        var id = dataItem.get("id");
        var newChild = findViaAPI(id);
        // console.log(newChild, isHasChild, testData.find(e => e?.id === id))
        var findNodeData: any = findNode(id)?.dataItem?.dataContext
        if(!findNodeData?.children && findNodeData?.isHaveChild) {
          series.addChildData(dataItem, [
            ...newChild
          ]);
        }
        if(findLevelById(data, id) === 3) {
          window.open('https://www.bni.co.id/id-id/')
        }
      }
    });
    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);
    // Make stuff animate on load
    // series.events.on('dataitemselected', (ev) => {
    //   console.log(ev.dataItem?.dataContext);
    // })

    return () => {
      root.dispose();
    };
  }, [])
  return (
    <div>
      <div id="chartdiv" style={{ width: "100vv", height: "100vh" }}></div>
    </div>
  );
}

export default App;
